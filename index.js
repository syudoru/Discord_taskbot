const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const publicKey = process.env.DISCORD_PUBLIC_KEY;

console.log(publicKey);

app.get("/", (req, res) => {
  res.send("Discord Task Bot is running.");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
