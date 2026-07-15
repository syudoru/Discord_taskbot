const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const publicKey = process.env.DISCORD_PUBLIC_KEY;

console.log(`public key: ${publicKey}`);

app.get("/", (req, res) => {
  res.send("Discord Task Bot is running.");
});

app.post("/interactions", (req, res) =>{
  console.log("Interaction received");

  res.status(200).send("OK");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
