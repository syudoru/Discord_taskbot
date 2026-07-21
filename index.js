console.log("1: index.js start");

//dotenvライブラリのconfig()を実行し、.envファイルを読み込む
import dotenv from "dotenv/config";
console.log("2: dotenv.config() imported");
//expressライブラリ取得
import express from "express";
console.log("3: express imported");
//discord-interactionsライブラリでverifyKeyMiddleware取得
import { verifyKeyMiddleware } from "discord-interactions";
console.log("4: discord-interactions imported");

//コマンド振り分け
//import { handleInteraction } from "./handlers/interactionHandler.js";
const { handleInteraction } = await import("./handlers/interactionHandler.js");
console.log("5: nteractionHandler.js imported");

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
    await handleInteraction(req, res);
  }
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
