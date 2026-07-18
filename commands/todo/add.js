import { SlashCommandSubcommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("タスクを追加します")
    .addStringOption(option =>
      option
        .setName("task")
        .setDescription("追加するタスクの内容")
        .setRequired(true)
    ),
  execute(interaction) {

    //タスク追加処理

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "タスクを追加する予定" }
    }
  }
}