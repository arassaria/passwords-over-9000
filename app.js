const inquirer = require("inquirer");
const {
  askForMasterPassword,
  chooseMode,
  getPasswordName,
  getNewPasswordValue,
  doMore,
} = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const { getPassword, setPassword } = require("./lib/password");

async function run() {
  let exit = 0;
  const masterPassword = await askForMasterPassword();
  if (!isMasterPasswordCorrect(masterPassword)) {
    console.error(`Go away, you filthy Hacker!`);
    return;
  }
  console.log(`Fuck, how did you get the super secret master password?`);
  while (exit === 0) {
    const mode = await chooseMode();
    console.log(mode);
    if (mode.includes("Write a passwort")) {
      const passwordName = await getPasswordName();
      const newPasswordValue = await getNewPasswordValue();
      await setPassword(passwordName, newPasswordValue);
    } else {
      const passwordName = await getPasswordName();

      const password = await getPassword(passwordName);
      if (password) {
        console.log(`${passwordName}: ${password}`);
      } else {
        console.log(
          "Very smart, Hacker. Asking for a password that does not exist."
        );
      }
    }
    const more = await doMore();
    if (!more.includes("Yes")) {
      exit = 1;
    }
  }
}

run();
