const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function readPasswordSafe() {
  const promise = await fs.readFile("./db.json", "utf8");
  const passwordSafe = await JSON.parse(promise);
  return passwordSafe;
}

async function writePasswordSafe(passwordSafe) {
  await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
}

async function getPassword(passwordName) {
  const passwordCollection = await collection("passwords");
  const cursor = await passwordCollection.findOne({
    name: passwordName,
  });
  const passwordBytes = CryptoJS.AES.decrypt(
    cursor.value,
    await readMasterPassword()
  );
  const userdataBytes = CryptoJS.AES.decrypt(
    cursor.userdata,
    await readMasterPassword()
  );
  return [
    passwordBytes.toString(CryptoJS.enc.Utf8),
    userdataBytes.toString(CryptoJS.enc.Utf8),
  ];

  // const passwordSafe = await readPasswordSafe();
  // const passwordBytes = CryptoJS.AES.decrypt(
  //   passwordSafe[passwordName],
  //   await readMasterPassword()
  // );
  // return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newUserdata, newPasswordValue) {
  const encryptedPasswordValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  const encryptedUserdata = CryptoJS.AES.encrypt(
    newUserdata,
    await readMasterPassword()
  ).toString();
  await collection("passwords").insertOne({
    name: passwordName,
    userdata: encryptedUserdata,
    value: encryptedPasswordValue,
  });
  // const passwordSafe = await readPasswordSafe();
  // passwordSafe[passwordName] = CryptoJS.AES.encrypt(
  //   newPasswordValue,
  //   await readMasterPassword()
  // ).toString();
  // await writePasswordSafe(passwordSafe);
}

exports.readPasswordSafe = readPasswordSafe;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
