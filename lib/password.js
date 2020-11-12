const fs = require("fs").promises;

async function readPasswordSafe() {
  const promise = await fs.readFile("./db.json", "utf8");
  const passwordSafe = await JSON.parse(promise);
  return passwordSafe;
}

async function writePasswordSafe(passwordSafe) {
  await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
}

async function getPassword(passwordName) {
  const passwordSafe = await readPasswordSafe();
  return passwordSafe[passwordName];
}

async function setPassword(passwordName, newPasswordValue) {
  const passwordSafe = await readPasswordSafe();
  passwordSafe[passwordName] = newPasswordValue;
  await writePasswordSafe(passwordSafe);
}

exports.readPasswordSafe = readPasswordSafe;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
