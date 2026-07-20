import SlashCommandBuilder, { SlashCommandSubcommandBuilder } from "discord.js";
import db from "./services/firestore.js";
console.log(isNaN(parseInt("100.3")));

import { createTask, deleteTask, getTasks, updateTask } from "./services/taskService.js";
import { GetOptions, SetLog, SetOptions } from "./services/userDataService.js";


/*
let task = {
  title: "お買い物",
  description: "なんか買ってくる"
};
(async () => {
  const result = await createTask("testuser", task);
  console.log(result);
})();

task = {
  title: "ゲーム",
};
(async () => {
  const result = await createTask("testuser", task);
  console.log(result);
})();

task = {
  title: "風呂入る",
};
(async () => {
  const result = await createTask("testuser", task);
  console.log(result);
})();
*/

/*
(async () => {
  const result = await getTasks("testuser");
  console.log(result);
})();
*/

/*
(async () => {
  const result = await deleteTask("testuser", "wWosIL9LOANJdGGaxSEm");
  console.log(result);
})();
*/

/*
(async () => {
  const result = await updateTask("testuser", "hKNdwpGZOEQrAs669j8S", { description: "温度は39度" });
  console.log(result);
})();
*/

console.log(new SlashCommandSubcommandBuilder()
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
  ));

(async () => {
  const result = await SetLog("testuser", "test", "hoge");
  console.log(result);
})();

(async () => {
  const result = await SetOptions("testuser", { defaultPriority: 20 });
  console.log(result);
})();


/*
await db
  .collection("test")
  .doc("123456789")
  .collection("task")
  .add({
    name: "Yamada",
    title: "bot作る"
  });
*/

/*
const pingCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!を返します")
}

console.log(pingCommand.data.description);
*/