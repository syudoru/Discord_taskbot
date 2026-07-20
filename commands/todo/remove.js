import { SlashCommandSubcommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("タスクを削除します")
    .addIntegerOption(option =>
      option
        .setName("task")
        .setDescription("削除するタスクの番号")
        .setRequired(true)
    ),
  async execute(interaction) {

    //タスク追加処理

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "タスクを削除する予定" }
    }
  }
}