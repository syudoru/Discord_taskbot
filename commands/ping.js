const { SlashCommandBuilder } = require("discord.js");
const { InteractionResponseType } = require("discord-interactions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!を返します"),

  async execute(interaction) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "Pong!" }
    };
  }
}