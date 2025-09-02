const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "..", "data", "student.txt")

let students;

const commands = [
	{
		name: "list",
		description: "Liste tout les élèves"
	},
	{
		name: 'find <string>',
		description: "Cherche puis affiche les infos d'un élève si il existe"
	},
	{
		name: 'more <number>',
		description: "Filtre les élèves en fonction de leur moyenne"
	}
];

try {
	students = JSON.parse(fs.readFileSync(filePath, "utf8"))
} catch(e) {
	console.error(e)
	process.exit(0)
}

const extractArg = (text) => {
	const elem = text.split(" ")
	if (elem.length < 3) return elem[1];
	return elem[1] + " " + elem[2];
}

const list = () => {
	const names = students.map((s) => s.name)
	console.log(names.join("\n"));
}

const find = (name) => {
	const student = students.find((s) => s.name.trim().toLowerCase() === name.trim().toLowerCase())
	if (!student) {
		console.log(`L'élève ${name} n'existe pas.`)
		return
	}
	console.table(student)
}

const more = (num) => {
	if (num < 0 || num > 20) {
		console.log("Merci de saisir une moyenne valide (entre 0 et 20)")
		return
	}
	
	const filterStudent = students.filter((s) => {
		return (s.notes.reduce((acc, curr) => acc + curr, 0) / s.notes.length) > num
	})
	if(filterStudent.length === 0) {
		console.log("Aucun élèves ne correspond à votre recherche.")
		return
	}
	
	console.table(filterStudent);
}

process.stdin.on("data", (chunk) => {
	const data = chunk.toString().trim().replace("\r\n", "");
	let arg;
	
	switch(data) {
		
		case "list":
			console.group("Liste des élèves :")
			list()
		  console.groupEnd()
			return
		
		case data.match(/^find /) ? data : null :
			arg = extractArg(data);
			find(arg)
			return
		
		case data.match(/^more /) ? data : null :
			arg = extractArg(data);
			more(arg)
			return
		
		default:
			console.group("Commande inconnu, voici la liste des commandes disponible")
			console.table(commands)
			console.groupEnd()
	}
})