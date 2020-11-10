const inquirer = require("inquirer");

const password = "test";

const args = process.argv.slice(2);

const questions = [
  {
    type: "password",
    name: "password",
    message: "Enter the master-password:",
  },
  //   {
  //     type: "checkbox",
  //     name: "feeling",
  //     message: "How do you feel today?",
  //     choices: ["Awesome!", "Good", "Sad", "I feel like hacking :D"],
  //   },
  //   {
  //     type: "checkbox",
  //     name: "Status",
  //     choices: ["Owner", "Hacker"],
  //   },
];

inquirer.prompt(questions).then((answers) => {
  //   switch (answers["feeling"]) {
  //     case ["Awesome!"]:
  //       console.log(
  //         `I love to hear that you are feeling ${answers["feeling"]} today.`
  //       );
  //       break;
  //     case ["Good"]:
  //       console.log(`Glad you are feeling ${answers["feeling"]} today.`);
  //       break;
  //     case ["Sad"]:
  //       console.log(
  //         `If you enter "my Penis" as password, it will respond with "Too short". Hope this little Easter Egg can cheer up your mood. ;)`
  //       );
  //       break;
  //     case ["I feel like hacking :D"]:
  //       console.log(`You should get a life, boy.`);
  //       break;
  //     default:
  //       console.log(`You have not chosen a mood for today.`);
  //       break;
  //   }
  //   console.log(`You are my ${answers["Status"]}`);
  if (args[0] === "Dominique" && answers["password"] === password) {
    console.log(`Hi ${args[0]}!`);
  } else if (answers["password"] === "my Penis") {
    console.log(`Too Short!`);
  } else {
    console.log(`Go away, you filthy Hacker, ${args[0]}`);
  }
});
