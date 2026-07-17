const { SlashCommandBuilder } = require("discord.js");

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!を返します")
}

console.log(pingCommand.data.description);