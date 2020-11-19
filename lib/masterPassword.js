const fs = require("fs").promises;
require("dotenv").config();

async function readMasterPassword() {
  return await fs.readFile(process.env.MASTER_PASSWORD, "utf8");
}

exports.readMasterPassword = readMasterPassword;
