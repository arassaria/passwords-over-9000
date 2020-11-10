const inquirer = require("inquirer");
const fs = require("fs").promises;

const secretMasterPassword = "test";

const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "Enter the master-password:",
  },
];

async function getData() {
  const promise = await fs.readFile("./db.json", "utf8");
  const data = await JSON.parse(promise);
  return data;
}

async function validateAccess() {
  let exit = 0;
  const { masterPassword } = await inquirer.prompt(questions);
  if (secretMasterPassword !== masterPassword) {
    console.error(`Go away, you filthy Hacker!`);
    return;
  }
  while (exit === 0) {
    console.log(`Fuck, how did you get the super secret master password?`);
    const { passwordName } = await inquirer.prompt({
      type: "input",
      name: "passwordName",
      message: "What password do you want to know?",
    });

    const passwordSafe = await getData();

    const password = passwordSafe[passwordName];
    if (password) {
      console.log(`${passwordName}: ${password}`);
    } else {
      console.log(
        "Very smart, Hacker. Asking for a password that does not exist."
      );
    }
    const { more } = await inquirer.prompt({
      type: "list",
      name: "more",
      message: "Do you want to look for more passwords?",
      choices: ["Yes", "No"],
    });
    if (!more.includes("Yes")) {
      exit = 1;
    }
  }
}

validateAccess();
