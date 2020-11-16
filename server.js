const express = require("express");
const app = express();
const port = 3000;

app.get("/api/passwords/wifi", (req, res) => {
  res.send("WIFI has a password");
});

app.listen(port, () => {
  console.log(`Passwords over 9000 is listening at http://localhost:${port}.`);
});
