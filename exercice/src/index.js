import {
  list,
  more,
  find,
  commands,
  add,
  saveFile,
} from "./controller/student.controller.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.setPrompt("Mon process >> ");
rl.prompt();

rl.on("line", (chunk) => {
  const data = chunk;

  let inQuestion = false;
  switch (data) {
    case "list":
      console.group("Liste des élèves :");
      list();
      console.groupEnd();
      break;

    case "find":
      rl.question("Quel est le nom de l'élève ? ", (name) => {
        find(name);

        rl.prompt();
      });
      break;

    case "more":
      rl.question("Quelle est la moyenne ? ", (avg) => {
        more(avg);

        rl.prompt();
      });
      break;

    case "add":
      inQuestion = true;
      rl.question("Quel est le nom de l'élève ? ", (name) => {
        rl.question(
          "Quelle est la note que vous voulez ajouter ? ",
          (grade) => {
            add(name, grade);

            rl.prompt();
          }
        );
      });
      break;

    case "close":
      rl.close();
      break;

    default:
      console.group(
        "Commande inconnue, voici la liste des commandes disponible"
      );
      console.table(commands);
      console.groupEnd();
      break;
  }

  if (!inQuestion) rl.prompt();
});

rl.on("close", () => {
  saveFile();
  console.log("Au revoir");
  process.exit(0);
});
