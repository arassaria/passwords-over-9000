const express = require("express");
const { connectToDb } = require("./lib/database");
const {
  getPassword,
  setPassword,
  updatePassword,
  deleteData,
  getPasswordNames,
} = require("./lib/password");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

app.get("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const passwordValue = await getPassword(name);
    res.send(passwordValue);
  } catch (error) {
    console.error(error);
    res.status(404).send("404. Password not found.");
  }
});

app.get("/api/passwords", async (req, res) => {
  const passwords = await getPasswordNames();
  res.send(passwords);
});

app.post("/api/passwords", async (req, res) => {
  const { name, userdata, value } = req.body;
  try {
    await setPassword(name, userdata, value);
    res.send("New Input posted into database.");
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send("An unexpected error occured. Please try again later.");
  }
});

app.patch("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  const { value } = req.body;
  await updatePassword(name, value);
  res.send("Updated data in database.");
});

app.delete("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  await deleteData(name);
  res.send("Data deleted from database");
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
