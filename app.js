const inquirer = require("inquirer");
const {
  askForMasterPassword,
  chooseMode,
  getPasswordName,
  getNewPasswordValue,
  doMore,
  setNewPasswordName,
} = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const {
  getPassword,
  setPassword,
  readPasswordSafe,
} = require("./lib/password");

async function run() {
  let exit = 0;
  const masterPassword = await askForMasterPassword();
  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error(`Go away, you filthy Hacker!`);
    return;
  }
  console.log(`Fuck, how did you get the super secret master password?`);
  while (exit === 0) {
    const passwordSafe = await readPasswordSafe();
    const passwordSafeKeys = Object.keys(passwordSafe);
    const mode = await chooseMode();
    console.log(mode);
    if (mode.includes("Enter a new password")) {
      const passwordName = await setNewPasswordName();
      const newPasswordValue = await getNewPasswordValue();
      await setPassword(passwordName, newPasswordValue);
    } else if (mode.includes("Edit a password")) {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const newPasswordValue = await getNewPasswordValue();
      await setPassword(passwordName, newPasswordValue);
    } else {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const password = await getPassword(passwordName);
      console.log(`${passwordName}: ${password}`);
    }
    const more = await doMore();
    if (!more.includes("Yes")) {
      exit = 1;
    }
  }
}

run();
