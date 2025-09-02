import path from "node:path";
import fs from "node:fs";

// process.cwd() renvoi le chemin absolu du dossier ou Node est executé.
const cwd = process.cwd();

const filePath = path.join(cwd, "data", "student.txt");

let students;

try {
  students = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (e) {
  console.error(e);
  process.exit(0);
}

export const list = () => {
  const names = students.map((s) => s.name);
  console.log(names.join("\n"));
};

export const find = (name) => {
  const student = students.find(
    (s) => s.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
  if (!student) {
    console.log(`L'élève ${name} n'existe pas.`);
    return;
  }
  console.table(student);
};

export const more = (num) => {
  if (num < 0 || num > 20) {
    console.log("Merci de saisir une moyenne valide (entre 0 et 20)");
    return;
  }

  const filterStudent = students.filter((s) => {
    return s.notes.reduce((acc, curr) => acc + curr, 0) / s.notes.length > num;
  });
  if (filterStudent.length === 0) {
    console.log("Aucun élèves ne correspond à votre recherche.");
    return;
  }

  console.table(filterStudent);
};

export const commands = [
  {
    name: "list",
    description: "Liste tout les élèves",
  },
  {
    name: "find <string>",
    description: "Cherche puis affiche les infos d'un élève si il existe",
  },
  {
    name: "more <number>",
    description: "Filtre les élèves en fonction de leur moyenne",
  },
];
