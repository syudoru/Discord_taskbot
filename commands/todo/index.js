import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { SlashCommandBuilder } from "discord.js";
import { InteractionResponseType } from "discord-interactions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const subcommands = {};
const builder = new SlashCommandBuilder()
  .setName("todo")
  .setDescription("To-Doリストを管理します");

const subcommandFiles = fs
  .readdirSync(__dirname)
  .filter(file => file.endsWith(".js") && file != "index.js");

for (const file of subcommandFiles) {

  const { default: subcommand } = await import(
    pathToFileURL(path.join(__dirname, file)).href
  );
  const name = subcommand.data.name;

  subcommands[name] = subcommand;
  builder.addSubcommand(subcommand.data);
}

export default {
  data: builder,
  subcommands
}