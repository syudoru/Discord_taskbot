const { http } = require("@google-cloud/functions-framework");

http("discordBot", (req, res) => {
  res.send("Hello, Cloud Run functions!");
});