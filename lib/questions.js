const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt({
    type: "password",
    name: "masterPassword",
    message: "Enter the master-password:",
  });
  return masterPassword;
}

async function chooseMode() {
  const { mode } = await inquirer.prompt({
    type: "list",
    name: "mode",
    message: "What do you want to do?",
    choices: ["Write a passwort", "Read a passwort"],
  });
  return mode;
}

async function getPasswordName() {
  const { passwordName } = await inquirer.prompt({
    type: "input",
    name: "passwordName",
    message: "Enter a password name",
  });
  return passwordName;
}

async function getNewPasswordValue() {
  const { newPasswordValue } = await inquirer.prompt({
    type: "input",
    name: "newPasswordValue",
    message: "Enter the new password.",
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
exports.getNewPasswordValue = getNewPasswordValue;
exports.doMore = doMore;
