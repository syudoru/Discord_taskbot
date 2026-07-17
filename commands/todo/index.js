const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder } = require("discord.js");
const { InteractionResponseType } = require("discord-interactions");

const subcommands = {};
const builder = new SlashCommandBuilder()
  .setName("todo")
  .setDescription("To-Doリストを管理します");

const subcommandFiles = fs
  .readdirSync(__dirname)
  .filter(file => file.endsWith(".js") && file != "index.js");

for (const file of subcommandFiles) {
  const subcommand = require(path.join(__dirname, file));
  const name = subcommand.data.name;

  subcommands[name] = subcommand;
  builder.addSubcommand(subcommand.data);
}

module.exports = {
  data: builder,
  subcommands
}