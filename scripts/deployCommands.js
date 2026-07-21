import dotenv from "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "@discordjs/builders";

const TOKEN = process.env.DISCORD_TOKEN;
const BOT_ID = process.env.DISCORD_APP_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

import commands from "../loaders/commandLoader.js";
//data要素取り出し
const commandsData = [...commands.values()].map(command => command.data);

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log(`${commandsData.length} 個のコマンドを登録します。`);

    //コマンド登録処理
    const result = await rest.put(
      Routes.applicationGuildCommands(BOT_ID, GUILD_ID),
      { body: commandsData });

    //登録結果表示
    console.log(`${result.length} 個のコマンドを登録しました。`);
    for (const command of result) {
      console.log(command.name);
    }
  }
  catch (error) {
    console.error(error);
    throw error;
  }
})();
