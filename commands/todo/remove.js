const { SlashCommandSubcommandBuilder } = require("discord.js");
const { InteractionResponseType } = require("discord-interactions");

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("タスクを削除します")
    .addIntegerOption(option =>
      option
        .setName("task")
        .setDescription("削除するタスクの番号")
        .setRequired(true)
    ),
  execute(interaction) {

    //タスク追加処理

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "タスクを削除する予定" }
    }
  }
}