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
console.log(`public key: ${PUBLIC_KEY}`);

//jsonの生データを読み出すよう設定
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
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
    return res.sendStatus(400).send("Invalid signature");
  }

  const isValid = verifyKey(
    req.rawBody,
    signature,
    timestamp,
    PUBLIC_KEY
  );

  if (!isValid) {
    //署名不許可
    return res.sendStatus(401).send("Invalid signature");
  }

  //署名検証成功
  console.log("Signature verification succeeded.");
  console.log(req.body);
  console.log(req.rawBody.toString());

  //PING
  if (req.body.type === 1) {
    //PONG
    return res.json({ type: 1 });
  }

  res.status(200).send("OK");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
