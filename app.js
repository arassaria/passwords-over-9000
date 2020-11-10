const inquirer = require("inquirer");

const password = "test";

let questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "password",
    name: "password",
    message: "Enter your password:",
  },
  {
    type: "input",
    name: "feeling",
    message: "How do you feel today?",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Hi ${answers["name"]}!`);
  console.log(`Glad to hear you feel ${answers["feeling"]}.`);
  console.log(
    `But you entered the wrong password, so go away, you filthy hacker.`
  );
});
