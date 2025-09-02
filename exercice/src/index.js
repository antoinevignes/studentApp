import { extractArg } from "./utils/utils.js";
import { list, more, find, commands } from "./controller/student.controller.js";

process.stdin.on("data", (chunk) => {
  const data = chunk.toString().trim().replace("\r\n", "");
  let arg;

  switch (data) {
    case "list":
      console.group("Liste des élèves :");
      list();
      console.groupEnd();
      return;

    case data.match(/^find /) ? data : null:
      arg = extractArg(data);
      find(arg);
      return;

    case data.match(/^more /) ? data : null:
      arg = extractArg(data);
      more(arg);
      return;

    default:
      console.group(
        "Commande inconnu, voici la liste des commandes disponible"
      );
      console.table(commands, ["name"]);
      console.groupEnd();
  }
});
