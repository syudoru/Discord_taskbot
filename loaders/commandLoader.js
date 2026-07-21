import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

console.log("4.3.1: module imported");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log("4.3.2: get dirname");

const commands = new Map();
//コマンドファイルパス取得
const commandsPath = path.join(__dirname, "../commands");

console.log("4.3.3: get command path");
//コマンドファイル・フォルダ取得
const entries = fs.readdirSync(commandsPath, { withFileTypes: true });

console.log("4.3.4: get command files");

for (const entry of entries) {
  let filePath;

  if (entry.isDirectory()) {
    filePath = path.join(commandsPath, entry.name, "index.js");

    if (!fs.existsSync(filePath)) {
      console.warn(`[WARNING] ${entry.name} フォルダに index.js がありません。`);
      continue;
    }
  } else if (entry.name.endsWith(".js")) {
    filePath = path.join(commandsPath, entry.name);
  } else {
    continue;
  }

  const { default: command } = await import(
    pathToFileURL(filePath).href
  );


  if ("data" in command && ("execute" in command || "subcommands" in command)) {
    commands.set(command.data.name, command)
    console.log(`4.3.5: get command ${command.data.name}`);
  } else {
    console.warn(`[WARNING] ${filePath} には data または execute プロパティがありません。`);
  }
}

//console.log(commands);

export default commands;