const path = require("node:path");
const { ApplicationCommandOptionType } = require("discord.js");
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
      return;
    }

    const firstOption = interaction.data.options?.[0];
    console.log(interaction);

    if (firstOption && firstOption.type === ApplicationCommandOptionType.Subcommand && command.subcommands) {
      const subcommand = command.subcommands[firstOption.name];
      if (!subcommand) {
        return res.status(400).send("Unknown subcommand");
      }
      //サブコマンド実行
      const response = subcommand.execute(interaction);
      return res.send(response);
    }

    //コマンド実行
    const response = await command.execute(interaction);
    return res.send(response);
  }

  res.status(400).send("Unknown interaction");
}

module.exports = {
  handleInteraction
};