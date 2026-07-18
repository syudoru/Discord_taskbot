import SlashCommandBuilder from "discord.js";

console.log(isNaN(parseInt("100.3")));

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!を返します")
}

console.log(pingCommand.data.description);