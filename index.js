const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

const publicKey = process.env.DISCORD_PUBLIC_KEY;
console.log(`public key: ${publicKey}`);

app.get("/", (req, res) => {
  res.send("Discord Task Bot is running.");
});

app.post("/interactions", (req, res) =>{
  console.log("Interaction received");

  console.log(req.body);
  console.log(req.rawBody.toString());

  res.status(200).send("OK");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
