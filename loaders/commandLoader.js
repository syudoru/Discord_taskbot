const fs = require("fs");
const path = require("path");

const commands = new Map();
//コマンドファイルパス取得
const commandsPath = path.join(__dirname, "../commands");
//コマンドファイル・フォルダ取得
const entries = fs.readdirSync(commandsPath, { withFileTypes: true });

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
  const command = require(filePath);

  if ("data" in command && ("execute" in command || "subcommands" in command)) {
    commands.set(command.data.name, command)
  } else {
    console.warn(`[WARNING] ${filePath} には data または execute プロパティがありません。`);
  }
}

//console.log(commands);

module.exports = commands;