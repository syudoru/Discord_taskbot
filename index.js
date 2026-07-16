//dotenvライブラリで.envファイルを読み込む
require("dotenv").config();
//expressライブラリ取得
const express = require('express');
//discord-interactionsライブラリでverifyKeyMiddleware取得
const { verifyKeyMiddleware } = require('discord-interactions');

//コマンド振り分け
const interactionHandler = require("./handlers/interactionHandler");

const app = express();
app.use(express.raw({ type: 'application/json' }));

const CLIENT_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const PORT = process.env.PORT || 8080;

//POST
app.post(
  "/interactions",
  verifyKeyMiddleware(CLIENT_PUBLIC_KEY),
  interactionHandler.handleInteraction
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

