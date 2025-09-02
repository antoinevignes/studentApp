import "dotenv/config";
import readline from "node:readline";

const CHOICES = [process.env.ROCK, process.env.PAPER, process.env.SCISSORS];
const WIN_CONDITIONS = {
  pierre: "ciseaux",
  papier: "pierre",
  ciseaux: "papier",
};

const globalStats = {
  games: 0,
  p1Wins: 0,
  p2Wins: 0,
  draws: 0,
};

const game = () => {
  let p1Score = 0;
  let p2Score = 0;

  console.group("Nouvelle partie");
  for (let i = 0; i < 3; i++) {
    const p1Choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const p2Choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

    if (p1Choice === p2Choice) {
    } else if (WIN_CONDITIONS[p1Choice] === p2Choice) {
      p1Score++;
    } else {
      p2Score++;
    }
  }

  console.group("Score final");
  console.log(`P1 : ${p1Score} points`);
  console.log(`P2 : ${p2Score} points`);

  globalStats.games++;

  if (p1Score > p2Score) {
    globalStats.p1Wins++;
    console.log("P1 a gagné !");
  } else if (p2Score > p1Score) {
    globalStats.p2Wins++;
    console.log("P2 a gagné !");
  } else {
    globalStats.draws++;
    console.log("Match nul");
  }
  console.groupEnd();
  console.groupEnd();
};

const showStats = () => {
  console.group("Statistiques globales :");
  console.log(`Parties jouées : ${globalStats.games}`);
  console.log(`Victoires P1 : ${globalStats.p1Wins}`);
  console.log(`Victoires P2 : ${globalStats.p2Wins}`);
  console.log(`Matchs nuls  : ${globalStats.draws}`);

  if (globalStats.games > 0) {
    const p1Rate = ((globalStats.p1Wins / globalStats.games) * 100).toFixed(1);
    const p2Rate = ((globalStats.p2Wins / globalStats.games) * 100).toFixed(1);
    const drawRate = ((globalStats.draws / globalStats.games) * 100).toFixed(1);

    console.log(`Taux de victoire P1 : ${p1Rate}%`);
    console.log(`Taux de victoire P2 : ${p2Rate}%`);
    console.log(`Taux de matchs nuls : ${drawRate}%`);
  }
  console.groupEnd();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Chifoumi -> ");
rl.prompt();

rl.on("line", (line) => {
  switch (line.trim()) {
    case "start":
      rl.question("Combien de tours ? ", (nbr) => {
        const turns = parseInt(nbr.trim(), 10) || 1;

        for (let i = 0; i < turns; i++) {
          game();
        }

        rl.prompt();
      });
      break;

    case "stats":
      showStats();
      break;

    case "reset":
      globalStats.draws = 0;
      globalStats.games = 0;
      globalStats.p1Wins = 0;
      globalStats.p2Wins = 0;
      console.log("Les stats ont été réinitialisées");
      break;

    default:
      console.error("Cette commande n'existe pas.");
  }
  rl.prompt();
});
