const fs = require("fs");

function getStudents() {
  try {
    const data = fs.readFileSync("./data/students.txt", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

const students = getStudents();

const studentNames = students.map((student) => student.name);

// PAR NOM
function getStudentByName(name) {
  if (!studentNames.includes(name.toUpperCase())) {
    return "Cet élève n'existe pas dans la base.";
  }

  return students.filter((student) => student.name === name.toUpperCase());
}

// PAR MOYENNE
function getStudentsByAvg(avg) {
  if (isNaN(avg) || avg > 20 || avg < 0) {
    console.error("Veuillez rentrer un nombre valide");
    return;
  }

  return students.filter((student) => {
    const studentAvg =
      student.notes.reduce((acc, currentValue) => acc + currentValue, 0) /
      student.notes.length;

    return studentAvg > avg;
  });
}

let searchMode = null;

// CHOIX MULTIPLE

console.group();
console.log("Veuillez choisir une option :");
console.group(
  "1 - Nom des élèves\n2 - Rechercher par nom d'élève\n3 - Rechercher par moyenne\n4 - Tout afficher"
);
console.groupEnd();

process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  if (searchMode === "name") {
    console.table(getStudentByName(input));
    searchMode = null;
    console.log("\nChoisissez une nouvelle option (1, 2, 3 ou 4):");
    return;
  }

  if (searchMode === "average") {
    const avg = parseFloat(input);
    console.table(getStudentsByAvg(avg));
    searchMode = null;
    console.log("\nChoisissez une nouvelle option (1, 2, 3 ou 4):");
    return;
  }

  switch (input) {
    case "1":
      console.table(studentNames);
      console.log("\nChoisissez une nouvelle option (1, 2, 3 ou 4):");
      break;
    case "2":
      searchMode = "name";
      console.log("Nom de l'élève :");
      break;
    case "3":
      searchMode = "average";
      console.log("Moyenne recherchée :");
      break;
    case "4":
      console.table(students);
      console.log("\nChoisissez une nouvelle option (1, 2, 3 ou 4):");
      break;
    default:
      console.log("Option non valide");
      console.log("\nChoisissez une nouvelle option (1, 2, 3 ou 4):");
  }
});
