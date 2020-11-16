const bodyParser = require("body-parser");
const express = require("express");
const { connectToDb } = require("./lib/database");
const { getPassword, setPassword, updatePassword } = require("./lib/password");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(bodyParser.json({ extended: true }));

app.get("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  const passwordValue = await getPassword(name);
  res.send(passwordValue);
});

app.post("/api/passwords", (req, res) => {
  const { name, userdata, value } = req.body;
  setPassword(name, userdata, value);
  res.send("New Input posted into database.");
});

app.patch("/api/passwords/:name", (req, res) => {
  const { name, value } = req.body;
  updatePassword(name, value);
  res.send("Updated data in database.");
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
