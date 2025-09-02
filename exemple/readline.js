import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// rl.question("Quel est votre nom ?\n", (answer) => {
//   console.log(`Bonjour ${answer}`);

//   rl.close();
// });

rl.setPrompt("Mon process >> ");
rl.prompt();

rl.on("line", (line) => {
  switch (line.trim()) {
    case "hello":
      console.log("world");
      break;
    case "name":
      rl.question("Quel est votre nom ? ", (name) => {
        rl.question("Quel est votre prénom ? ", (surname) => {
          console.log(`Bonjour ${name} ${surname}`);
          rl.prompt();
        });
      });
      break;
    case "quit":
      rl.close();
      break;
    default:
      console.log("Unknown command");
      break;
  }
  rl.prompt();
});

rl.on("close", () => {
  console.log("shutdown");
});
