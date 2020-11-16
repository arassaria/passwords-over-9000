const {
  askForMasterPassword,
  chooseMode,
  getPasswordName,
  getNewPasswordValue,
  doMore,
  setNewUserdata,
} = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const {
  getPassword,
  readPasswordSafe,
  updateUserdata,
  deleteData,
  updatePassword,
} = require("./lib/password");
const { connectToDb, closeDbConnection } = require("./lib/database");
const dotenv = require("dotenv");
const { enterNewPassword } = require("./components/enterNewPassword");

dotenv.config();

async function run() {
  console.log("Connecting to Database...");
  await connectToDb(process.env.DB_URI, process.env.DB_NAME);
  console.log("Connected to Database.");
  let exit = 0;
  const masterPassword = await askForMasterPassword();
  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.log(`Go away, you filthy Hacker!`);
    run();
    return;
  }
  console.log(`Fuck, how did you get the super secret master password?`);
  while (exit === 0) {
    const passwordSafeKeys = await readPasswordSafe();
    const mode = await chooseMode();
    console.log(mode);
    if (mode.includes("Enter a new password")) {
      await enterNewPassword(passwordSafeKeys);
    } else if (mode.includes("Edit a password")) {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const newPasswordValue = await getNewPasswordValue();
      await updatePassword(passwordName, newPasswordValue);
    } else if (mode.includes("Edit userdata")) {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const newUserdata = await setNewUserdata();
      await updateUserdata(passwordName, newUserdata);
    } else if (mode.includes("Delete a password")) {
      const passwordName = await getPasswordName(passwordSafeKeys);
      await deleteData(passwordName);
    } else {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const password = await getPassword(passwordName);
      console.log(`${passwordName}`);
      console.log(`userdata: ${password[0]}`);
      console.log(`password: ${password[1]}`);
    }
    const more = await doMore();
    if (!more.includes("Yes")) {
      exit = 1;
    }
  }
  await closeDbConnection();
}

run();
