//import { ApplicationCommandOptionType } from "discord.js";
import { InteractionType } from "discord-interactions";

console.log("4.1: discord.js start");
const { ApplicationCommandOptionType } = await import("discord.js");
console.log("4.2: discord.js end");

//コマンドMap取得
import commands from "../loaders/commandLoader.js";

async function handleInteraction(req, res) {
  console.log("Interaction received");

  //本文取得
  const interaction = req.body;

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

    if (firstOption && firstOption.type === ApplicationCommandOptionType.Subcommand && command.subcommands) {
      const subcommand = command.subcommands[firstOption.name];
      if (!subcommand) {
        return res.status(400).send("Unknown subcommand");
      }
      //サブコマンド実行
      const response = await subcommand.execute(interaction);
      return res.send(response);
    }

    //コマンド実行
    const response = await command.execute(interaction);
    return res.send(response);
  }

  res.status(400).send("Unknown interaction");
}

export { handleInteraction };
