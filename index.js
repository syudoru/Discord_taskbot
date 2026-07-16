//dotenvライブラリで.envファイル読み込み
require("dotenv").config();
//expressライブラリ読み込み
const express = require('express');
//discord-interactionsライブラリのインタラクションタイプとverifyKeyのみ読み込み
const { InteractionType, InteractionResponseType, verifyKey } = require('discord-interactions');

const app = express();
app.use(express.raw({ type: 'application/json' }));

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const PORT = process.env.PORT || 8080;

// インタラクションエンドポイント
app.post('/interactions', async (req, res) => {
  console.log("Interaction received");

  //署名とタイムスタンプ取得
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const body = req.body;

  if (!body || !signature || !timestamp || !PUBLIC_KEY) {
    //データ不備
    return res.status(401).send("Insufficient data");
  }

  //署名検証
  try {
    const isValidRequest = await verifyKey(body, signature, timestamp, PUBLIC_KEY);
    if (!isValidRequest) {
      //署名不許可
      console.log("invalid request signature");
      return res.status(401).send("invalid request signature");
    }
  } catch (err) {
    //署名検証エラー
    console.error(err);
    return res.sendStatus(401);
  }

  //署名検証成功
  console.log("Signature verification succeeded.");

  const interaction = JSON.parse(body.toString());

  // PINGへの応答
  if (interaction.type === InteractionType.PING) {
    //PONG
    const responseBody = { type: InteractionResponseType.PONG }
    console.log("PONG response body:", JSON.stringify(responseBody));
    return res.send(responseBody);
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

