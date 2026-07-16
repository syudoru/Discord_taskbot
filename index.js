/*
//dotenvライブラリで.envファイル読み込み
require("dotenv").config();

//expressライブラリ読み込み
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

//discord-interactionsライブラリのverifyKeyのみ読み込み
const { verifyKey } = require("discord-interactions");

//環境変数取得
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

//jsonの生データを読み出すよう設定
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

app.get("/", (req, res) => {
  res.send("Discord Task Bot is running.");
});

app.post("/interactions", (req, res) => {
  console.log("Interaction received");

  //discordの署名検証
  const signature = req.get("X-Signature-Ed25519");
  const timestamp = req.get("X-Signature-Timestamp");

  if (!req.rawBody || !signature || !timestamp || !PUBLIC_KEY) {
    //データ不備
    return res.status(401).send("Invalid signature");
  }

  try {
    const isValid = verifyKey(
      req.rawBody,
      signature,
      timestamp,
      PUBLIC_KEY
    );

    if (!isValid) {
      //署名不許可
      return res.status(401).send("invalid request signature");
    }

  } catch (err) {
    //署名検証エラー
    console.error(err);
    return res.sendStatus(401);
  }

  //署名検証成功
  console.log("Signature verification succeeded.");
  //console.log(req.body);
  console.log(req.rawBody);

  //PING
  if (req.body.type === 1) {
    //PONG
    const responseBody = { type: 1 };
    console.log("PONG response body:", JSON.stringify(responseBody));
    return res.send(responseBody);
  }

  console.log("send 200");
  res.status(200).send("OK");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
*/

const express = require('express');
const { InteractionType, InteractionResponseType, verifyKey } = require('discord-interactions');

const app = express();
app.use(express.raw({ type: 'application/json' }));

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

// インタラクションエンドポイント
app.post('/interactions', async (req, res) => {
  console.log("Interaction received");

  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const body = req.body;

  if (!body || !signature || !timestamp || !PUBLIC_KEY) {
    //データ不備
    return res.status(401).send("Invalid signature");
  }

  // リクエストの検証
  const isValidRequest = verifyKey(body, signature, timestamp, PUBLIC_KEY);
  if (!isValidRequest) {
    return res.status(401).send('Bad request signature');
  }

  //署名検証成功
  console.log("Signature verification succeeded.");

  const interaction = JSON.parse(body.toString());

  // PINGへの応答
  if (interaction.type === InteractionType.PING) {
    //PONG
    const responseBody = { type: InteractionResponseType.PONG }
    console.log("PONG response body:", JSON.stringify(responseBody));
    return res.json(responseBody);
  }

  // スラッシュコマンドへの応答
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const { name } = interaction.data;

    if (name === 'hello') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'こんにちは！HTTPインタラクションBotです！?'
        }
      });
    }
  }

  res.status(400).send('Unknown interaction');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});