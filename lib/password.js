const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { up } = require("inquirer/lib/utils/readline");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function readPasswordSafe() {
  const promises = await collection("passwords").find({}).toArray();
  const passwordSafe = promises.map((promise) => promise.name);
  return passwordSafe;
}

async function updatePassword(passwordName, newPasswordValue) {
  const encryptedPasswordValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  await collection("passwords").updateOne(
    { name: passwordName },
    { $set: { value: encryptedPasswordValue } }
  );
}

async function updateUserdata(passwordName, newUserdata) {
  const encryptedUserdata = CryptoJS.AES.encrypt(
    newUserdata,
    await readMasterPassword()
  ).toString();
  await collection("passwords").updateOne(
    { name: passwordName },
    { $set: { userdata: encryptedUserdata } }
  );
}

async function deleteData(passwordName) {
  await collection("passwords").deleteOne({
    name: passwordName,
  });
}

async function getPassword(passwordName) {
  const promise = await collection("passwords").findOne({
    name: passwordName,
  });
  const passwordBytes = CryptoJS.AES.decrypt(
    promise.value,
    await readMasterPassword()
  );
  const userdataBytes = CryptoJS.AES.decrypt(
    promise.userdata,
    await readMasterPassword()
  );
  return [
    passwordBytes.toString(CryptoJS.enc.Utf8),
    userdataBytes.toString(CryptoJS.enc.Utf8),
  ];
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
}

exports.readPasswordSafe = readPasswordSafe;
exports.updatePassword = updatePassword;
exports.updateUserdata = updateUserdata;
exports.deleteData = deleteData;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
