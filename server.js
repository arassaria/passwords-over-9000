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
const port = 3001;
require("dotenv").config();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      res.status(404).send("404. Password not found.");
      return;
    }
    res.send(passwordValue);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An internal server error occured. Please try again later.");
  }
});

app.get("/api/passwords", async (req, res) => {
  try {
    const passwords = await getPasswordNames();
    res.send(passwords);
  } catch (e) {
    console.error(error);
    res
      .status(500)
      .send("An unexpected error occured. Please try again later.");
  }
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
  try {
    await updatePassword(name, value);
    res.send("Updated data in database.");
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send("An unexpected error occured. Please try again later.");
  }
});

app.delete("/api/passwords/:name", async (req, res) => {
  const { name } = req.params;
  try {
    await deleteData(name);
    res.send("Data deleted from database");
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send("An unexpected error occured. Please try again later.");
  }
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
