const { SlashCommandBuilder } = require("discord.js");
const { InteractionResponseType } = require("discord-interactions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("さいころを振ります"),

  async execute(req, res) {
    let diceMax = 6;
    console.log(req)
    const reqNum = parseInt(req.body);
    if (req.body !== "") {
      diceMax = reqNum;
    }
    if (isNaN(diceMax)) {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "整数を入力してください" }
      })
      return;
    }
    if (diceMax <= 0) {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "1以上の整数を入力してください" }
      })
      return;
    }
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: Math.floor(Math.random() * diceMax) + 1 }
    });
  }
}