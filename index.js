//dotenvライブラリで.envファイル読み込み
require("dotenv").config();
//expressライブラリ読み込み
const express = require('express');
//discord-interactionsライブラリのインタラクションタイプとverifyKeyのみ読み込み
const { verifyKeyMiddleware, InteractionType, InteractionResponseType } = require('discord-interactions');

//内容振り分け先
const interactionHandler = require("./handlers/interactionHandler");

const app = express();
app.use(express.raw({ type: 'application/json' }));

const CLIENT_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const PORT = process.env.PORT || 8080;

// インタラクションエンドポイント
app.post(
  "/interactions",
  verifyKeyMiddleware(CLIENT_PUBLIC_KEY),
  interactionHandler.handleInteraction
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

