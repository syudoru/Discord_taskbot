const { SlashCommandBuilder } = require("discord.js");
const { InteractionResponseType } = require("discord-interactions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("さいころを振ります(最大値を指定できます)"),

  async execute(interaction) {
    let diceMax = 6;
    console.log(interaction);
    const value = interaction.data.options[0].value;
    const reqNum = parseInt(value);
    if (value !== "") {
      diceMax = reqNum;
    }
    if (isNaN(diceMax)) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "整数を入力してください" }
      };
    }
    if (diceMax <= 0) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "1以上の整数を入力してください" }
      };
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: Math.floor(Math.random() * diceMax) + 1 }
    };
  }
}