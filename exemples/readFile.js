const fs = require("fs");

fs.readFile("./data/titanic.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

fs.writeFile("./data/test.txt", "Hello node", (err) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log("Success");
});
