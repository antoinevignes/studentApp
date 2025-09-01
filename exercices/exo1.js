const secretNumber = Math.floor(Math.random() * 100) + 1;
let remainingTries = 10;

console.log("Entrez un nombre compris entre 1 et 100 :");

process.stdin.on("data", (data) => {
  const number = parseInt(data.toString().trim());

  if (isNaN(number)) {
    console.log("Veuillez rentrer un nombre !");
    return;
  }

  if (number < 1 || number > 100) {
    console.log("Veuillez rentrer un nombre compris entre 1 et 100 !");
    return;
  }

  remainingTries--;

  if (number === secretNumber) {
    console.log(`Félicitations ! Vous avez trouvé le nombre ${secretNumber} !`);
    process.exit(0);
  } else {
    if (remainingTries === 0) {
      console.log(`Perdu ! Il vous reste ${remainingTries} tentatives...`);
      process.exit(0);
    }

    const indice = number < secretNumber ? "plus grand" : "plus petit";
    console.log(
      `Le nombre est ${indice} ! Il vous reste ${remainingTries} tentative(s).`
    );
  }
});
