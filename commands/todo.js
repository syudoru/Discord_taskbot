const { SlashCommandBuilder } = require("discord.js");
const { InteractionResponseType } = require("discord-interactions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("todo")
    .setDescription("To-Doリストを管理します"),

  async execute(interaction) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "これから作る" }
    };
  }
}