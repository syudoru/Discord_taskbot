import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { InteractionResponseType } from "discord-interactions";
import { MessageFlags } from "discord-api-types/v10";
import { createTask } from "../../services/taskService.js";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("タスクを追加します")
    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("タスク名")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("description")
        .setDescription("タスクの説明")
        .setRequired(false)
    ),
  async execute(interaction) {
    const userId = interaction.member.user.id ?? interaction.user.id;

    let taskData = {};

    for (const option of interaction.data.options[0].options) {
      taskData[option.name] = option.value;
    }

    await createTask(userId, taskData);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `タスクを追加しました (タスク名: ${taskData.title})`,
        flags: MessageFlags.Ephemeral
      }
    };
  }
}