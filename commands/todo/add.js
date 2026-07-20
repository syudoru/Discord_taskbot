import { SlashCommandSubcommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";
import { } from "../../services/taskService.js";
import db from "../../services\/firestore.js";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("タスクを追加します")
    .addStringOption(option =>
      option
        .setName("task")
        .setDescription("追加するタスク名")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("description")
        .setDescription("タスクの説明")
        .setRequired(false)
    ),
  async execute(interaction) {
    console.log(interaction.data.options[0].options);

    for (const option of interaction.data.options[0].options) {
      console.log(option);
    }


    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "タスクを追加する予定" }
    }
  }
}