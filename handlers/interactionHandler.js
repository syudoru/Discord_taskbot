const { InteractionType } = require("discord-interactions");
const pingCommand = require("../commands/ping");

async function handleInteraction(req, res) {
  console.log("Interaction received");

  //本文取得
  const interaction = req.body;
  const commandLoaderPath = path.join(__dirname, "../loaders/commandLoader.js");

  console.log(commandLoaderPath);
  //コマンドMap取得
  const commands = require(commandLoaderPath);

  //コマンドの場合
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const commandName = interaction.data.name;
    const command = commands.get(commandName)

    if (!command) {
      //存在しないコマンド
      res.status(400).send("Unknown command");
    }

    //コマンド実行
    await command.execute(req, res);

  }

  res.status(400).send("Unknown interaction");
}

module.exports = {
  handleInteraction
};