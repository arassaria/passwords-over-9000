const {
  askForMasterPassword,
  chooseMode,
  getPasswordName,
  getNewPasswordValue,
  doMore,
  setNewPasswordName,
  setNewUserdata,
} = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const {
  getPassword,
  setPassword,
  readPasswordSafe,
} = require("./lib/password");
const { connectToDb, closeDbConnection } = require("./lib/database");
const dotenv = require("dotenv");

dotenv.config();

async function run() {
  console.log("Connecting to Database...");
  await connectToDb(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jbf9x.mongodb.net/passwords-over-9000?retryWrites=true&w=majority`,
    "passwords-over-9000"
  );
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
    const passwordSafe = await readPasswordSafe();
    const passwordSafeKeys = Object.keys(passwordSafe);
    const mode = await chooseMode();
    console.log(mode);
    if (mode.includes("Enter a new password")) {
      const passwordName = await setNewPasswordName();
      const newUserdata = await setNewUserdata();
      const newPasswordValue = await getNewPasswordValue();
      await setPassword(passwordName, newUserdata, newPasswordValue);
    } else if (mode.includes("Edit a password")) {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const newPasswordValue = await getNewPasswordValue();
      await setPassword(passwordName, newPasswordValue);
    } else {
      const passwordName = await getPasswordName(passwordSafeKeys);
      const password = await getPassword(passwordName);
      console.log(`${passwordName}`);
      console.log(`userdata: ${password[1]}`);
      console.log(`password: ${password[0]}`);
    }
    const more = await doMore();
    if (!more.includes("Yes")) {
      exit = 1;
    }
  }
  await closeDbConnection();
}

run();
