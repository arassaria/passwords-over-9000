const inquirer = require("inquirer");
const CryptoJS = require("crypto-js");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt({
    type: "password",
    name: "masterPassword",
    message: "Enter the master-password:",
  });
  const encryptedMasterPassword = CryptoJS.SHA256(masterPassword).toString();
  return encryptedMasterPassword;
}

async function chooseMode() {
  const { mode } = await inquirer.prompt({
    type: "list",
    name: "mode",
    message: "What do you want to do?",
    choices: [
      "Enter a new password",
      "Edit a password",
      "Edit userdata",
      "Read a password",
      "Delete a password",
    ],
  });
  return mode;
}

async function getPasswordName(passwordSafeKeys) {
  const { passwordName } = await inquirer.prompt({
    type: "list",
    name: "passwordName",
    message: "Choose a password",
    choices: passwordSafeKeys,
  });
  return passwordName;
}

async function setNewPasswordName() {
  const { passwordName } = await inquirer.prompt({
    type: "input",
    name: "passwordName",
    message: "Set a new password name",
  });
  return passwordName;
}

async function setNewUserdata() {
  const { userdata } = await inquirer.prompt({
    type: "input",
    name: "userdata",
    message: "Enter a username or eMail-address",
  });
  return userdata;
}

async function getNewPasswordValue() {
  const { newPasswordValue } = await inquirer.prompt({
    type: "input",
    name: "newPasswordValue",
    message: "Enter the new password:",
  });
  return newPasswordValue;
}

async function doMore() {
  const { more } = await inquirer.prompt({
    type: "list",
    name: "more",
    message: "Do you want to look for more passwords?",
    choices: ["Yes", "No"],
  });
  return more;
}

exports.askForMasterPassword = askForMasterPassword;
exports.chooseMode = chooseMode;
exports.getPasswordName = getPasswordName;
exports.setNewUserdata = setNewUserdata;
exports.setNewPasswordName = setNewPasswordName;
exports.getNewPasswordValue = getNewPasswordValue;
exports.doMore = doMore;
