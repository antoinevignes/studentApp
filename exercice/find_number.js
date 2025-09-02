const random = Math.floor(Math.random() * 100) + 1;
let count = 0;

console.log("Devinez un chiffre compris entre 1 et 100");

process.stdin.on("data", (chunk) => {
	const number = parseInt(chunk.toString().trim())
	
	if (isNaN(number)) {
		console.log("Merci de saisir une valeur numérique");
		return
	}
	
	if (number < 1 || number > 100) {
		console.log("Merci de saisir une valeur comprise entre 1 et 100");
		return
	}
	
	if (count > 10) {
		console.log("Perdu vous avez dépassé la limite de tentative")
		process.exit(0)
	}
	
	
	count++;
	
	
	if (number < random) {
		console.log("La valeur rechercher est plus grande")
	}
	else if (number > random) {
		console.log("La valeur rechercher est plus petite")
	}
	else {
		console.log(`Vous avez gagné en ${count} essai.`)
		process.exit(0);
	}
	
	console.log(`Nombre d'éssai restant : ${10 - count}`)
})