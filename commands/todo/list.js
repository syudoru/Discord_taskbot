import { SlashCommandSubcommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";
import { createTask, getTasks } from "../../services/taskService.js";
import { SetLog } from "../../services/userDataService.js";
import db from "../../services\/firestore.js";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("list")
    .setDescription("タスク一覧を表示します"),

  async execute(interaction) {
    const userId = interaction.member.user.id ?? interaction.user.id;

    const taskList = await getTasks(userId);

    let taskIdList = [];
    for (let i = 0; i < taskList.length; i++) {
      taskIdList[i] = taskList[i].id;
    }

    await SetLog(userId, "lastTaskList", taskList);

    const message = taskList
      .map((task, index) => `${index + 1}. ${task.title}`)
      .join("\n");

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: message }
    };
  }
}