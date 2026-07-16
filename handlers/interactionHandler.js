const { InteractionType } = require("discord-interactions");
const pingCommand = require("../commands/ping");

function handleInteraction(req, res) {
  console.log("Interaction received");

  //本文取得
  const interaction = req.body;

  //コマンドの場合
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const commandName = interaction.data.name;

    //コマンドで振り分け
    switch (commandName) {
      case "ping":
        return await pingCommand.execute(req, res);

      default:
        res.status(400).send("Unknown command");
    }

  }

  res.status(400).send("Unknown interaction");
}

module.exports = {
  handleInteraction
};