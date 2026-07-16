//dotenvライブラリで.envファイル読み込み
require("dotenv").config();
//expressライブラリ読み込み
const express = require('express');
//discord-interactionsライブラリのインタラクションタイプとverifyKeyのみ読み込み
const { verifyKeyMiddleware, InteractionType, InteractionResponseType } = require('discord-interactions');

const app = express();
app.use(express.raw({ type: 'application/json' }));

const CLIENT_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const PORT = process.env.PORT || 8080;

// インタラクションエンドポイント
app.post('/interactions', verifyKeyMiddleware(CLIENT_PUBLIC_KEY), (req, res) => {

  console.log("Interaction received");

  //本文取得
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Hello from Discord Interactions!' }
    })
  }

  res.status(400).send('Unknown interaction');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

