import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { InteractionResponseType } from "discord-interactions";
import { MessageFlags } from "discord-api-types/v10";
import { deleteTask } from "../../services/taskService.js";
import { GetLog } from "../../services/userDataService.js";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("タスクを削除します")
    .addIntegerOption(option =>
      option
        .setName("task")
        .setDescription("削除するタスクの番号 (最後に表示したタスクリストについている番号を入力してください)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userId = interaction.member.user.id ?? interaction.user.id;

    const taskIdList = await GetLog(userId, "lastTaskList");
    let taskNum = "";
    for (const option of interaction.data.options[0].options) {
      if (option.name == "task") {
        taskNum = option.value - 1;
      }
    }
    const taskId = taskIdList[taskNum];
    const resutl = await deleteTask(userId, taskId);
    if (resutl) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `タスクを削除しました`,
          flags: MessageFlags.Ephemeral
        }
      };
    }
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `タスクが見つかりませんでした`,
        flags: MessageFlags.Ephemeral
      }
    };

  }
}