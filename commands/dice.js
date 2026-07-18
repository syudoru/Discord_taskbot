import { SlashCommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";

export default {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("さいころを振ります")
    .addIntegerOption(option =>
      option
        .setName("max")
        .setDescription("最大値")
        .setRequired(false)
    ),

  async execute(interaction) {
    const diceMax = interaction.data.options?.[0]?.value ?? 6;
    if (diceMax < 1) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "1以上の整数を入力してください" }
      };
    }
    const result = Math.floor(Math.random() * diceMax) + 1;
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: result }
    };
  }
}