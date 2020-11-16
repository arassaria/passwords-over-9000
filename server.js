const { response } = require("express");
const express = require("express");
const { connectToDb } = require("./lib/database");
const { getPassword } = require("./lib/password");
const app = express();
const port = 3000;
require("dotenv").config();

app.get("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  const passwordValue = await getPassword(name);
  res.send(passwordValue);
});

app.post("/api/passwords", (req, res) => {
  res.send("Under Construction");
});

async function run() {
  console.log("Connecting to Database...");
  await connectToDb(process.env.DB_URI, process.env.DB_NAME);
  console.log("Connected to Database.");

  app.listen(port, () => {
    console.log(
      `Passwords over 9000 is listening at http://localhost:${port}.`
    );
  });
}

run();
