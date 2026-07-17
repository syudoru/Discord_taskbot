const fs = require("fs");
const path = require("path");

const commands = new Map();
//コマンドファイルパス取得
const commandsPath = path.join(__dirname, "../commands");
//コマンドファイル取得
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    commands.set(command.data.name, command)
  } else {
    console.warn(`[WARNING] ${filePath} には data または execute プロパティがありません。`);
  }
}

//console.log(commands);

module.exports = commands;