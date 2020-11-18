const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPasswordNames() {
  const promises = await collection("passwords").find({}).toArray();
  const passwordSafe = promises.map((promise) => promise.name);
  return passwordSafe;
}

async function updatePassword(passwordName, newUserdata, newPasswordValue) {
  const encryptedPasswordValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  const encryptedUserdata = CryptoJS.AES.encrypt(
    newUserdata,
    await readMasterPassword()
  ).toString();
  await collection("passwords").updateOne(
    { name: passwordName },
    {
      $set: {
        userdata: encryptedUserdata,
        value: encryptedPasswordValue,
      },
    }
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
  if (!promise) {
    return null;
  } else {
    const passwordBytes = CryptoJS.AES.decrypt(
      promise.value,
      await readMasterPassword()
    );
    const userdataBytes = CryptoJS.AES.decrypt(
      promise.userdata,
      await readMasterPassword()
    );
    return [
      userdataBytes.toString(CryptoJS.enc.Utf8),
      passwordBytes.toString(CryptoJS.enc.Utf8),
    ];
  }
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

exports.getPasswordNames = getPasswordNames;
exports.updatePassword = updatePassword;
exports.updateUserdata = updateUserdata;
exports.deleteData = deleteData;
exports.getPassword = getPassword;
exports.setPassword = setPassword;
