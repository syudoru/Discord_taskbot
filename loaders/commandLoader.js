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



// 先に読み込むべきファイルパスを一覧化
const filePaths = [];
for (const entry of entries) {
  if (entry.isDirectory()) {
    const indexPath = path.join(commandsPath, entry.name, "index.js");
    if (fs.existsSync(indexPath)) {
      filePaths.push(indexPath);
    } else {
      console.warn(`[WARNING] ${entry.name} フォルダに index.js がありません。`);
    }
  } else if (entry.name.endsWith(".js")) {
    filePaths.push(path.join(commandsPath, entry.name));
  }
}

console.log(`4.3.5: importing ${filePaths.length} files in parallel`);

// すべて並列でimportする
const modules = await Promise.all(
  filePaths.map(filePath => import(pathToFileURL(filePath).href))
);

for (const { default: command } of modules) {
  if ("data" in command && ("execute" in command || "subcommands" in command)) {
    commands.set(command.data.name, command);
    console.log(`4.3.: get command file ${command.data.name}`);
  } else {
    console.warn(`[WARNING] コマンドには data または execute プロパティがありません。`);
  }
}
/*
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
  console.log(`4.3.5: get command file start`);
  
  const { default: command } = await import(
    pathToFileURL(filePath).href
  );


  if ("data" in command && ("execute" in command || "subcommands" in command)) {
    commands.set(command.data.name, command)
    console.log(`4.3.: get command file ${command.data.name}`);
  } else {
    console.warn(`[WARNING] ${filePath} には data または execute プロパティがありません。`);
  }
}
*/

//console.log(commands);

export default commands;