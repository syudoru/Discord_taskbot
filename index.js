//dotenvライブラリのconfig()を実行し、.envファイルを読み込む
import dotenv from "dotenv/config";
//expressライブラリ取得
import express from "express";
//discord-interactionsライブラリでverifyKeyMiddleware取得
import { verifyKeyMiddleware } from "discord-interactions";

//コマンド振り分け
import interactionHandler from "./handlers/interactionHandler.js";

const app = express();
app.use(express.raw({ type: 'application/json' }));

const CLIENT_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const PORT = process.env.PORT || 8080;

if (!CLIENT_PUBLIC_KEY) {
  throw new Error("CLIENT_PUBLIC_KEY が設定されていません。");
}

//POST
app.post(
  "/interactions",
  verifyKeyMiddleware(CLIENT_PUBLIC_KEY),
  async (req, res) => {
    await interactionHandler.handleInteraction(req, res);
  }
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

