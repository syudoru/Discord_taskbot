require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");

const TOKEN = process.env.DISCORD_TOKEN;
const BOT_ID = process.env.DISCORD_APP_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "..", "commands")).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log(`${commands.length} 個のコマンドを登録します。`);

    //コマンド登録処理
    const result = await rest.put(
      Routes.applicationGuildCommands(BOT_ID, GUILD_ID),
      { body: commands });

    //登録結果表示
    console.log(`${result.length} 個のコマンドを登録しました。`);
    for (const command of result) {
      console.log(command.name);
    }
  }
  catch (error) {
    console.error(error);
  }
})();
