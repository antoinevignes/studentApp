import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import querystring from "node:querystring";
import { users } from "./data/user.js";

const cwd = process.cwd();
const viewPath = path.join(cwd, "view");
const headerPath = path.join(viewPath, "__header.html");
const footerPath = path.join(viewPath, "__footer.html");
const publicPath = path.join(cwd, "public");

const hostname = "localhost";
const port = "8080";

let customUsers = [...users];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  const user = customUsers.find((u) => u.nom === url);
  const usernameArray = customUsers.map((user) => user.nom);

  const header = fs.readFileSync(headerPath, "utf8");
  const footer = fs.readFileSync(footerPath, "utf8");

  //   CSS
  if (url.startsWith("style")) {
    const filename = url.split("/")[1];
    fs.readFile(path.join(publicPath, filename), "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(err));
      }
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      res.end(data);
    });
    return;
  }

  //   404
  if (url !== "" && url !== "add-user" && !usernameArray.includes(url)) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    ${header}
		<h1>404</h1>
		<a href="/">Retour à l'accueil</a>
    ${footer}
  `);
    return;
  }

  //   PAGE USER
  if (user && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    ${header}
    <h1>${user.nom}</h1>
	<p>Email: ${user.email}</p>
	<p>Rôle: ${user.role}</p>
	<a href="/">Retour à l'accueil</a>
    ${footer}
  `);
    return;
  }

  //   FORMULAIRE
  if (url === "add-user" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const obj = querystring.parse(body);
      console.log(obj);

      if (!obj.nom || obj.nom.trim() === "") {
        res.writeHead(401, { "Content-Type": "text/plain; charset=utf8" });
        res.end("Le champ nom ne peut pas être vide.");
        return;
      }

      customUsers.push(obj);
      res.writeHead(301, {
        Location: "/",
      });
      res.end();
    });
    return;
  }

  //   PAGE FORMULAIRE
  if (url === "add-user" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
		${header}
		<h1>Ajouter un utilisateur</h1>

		<form method="POST" action="/add-user">
		 	<input type="text" name="nom" placeholder="Nom" />
			<input type="email" name="email" placeholder="Email" />
			<input type="hidden" name="role" value="utilisateur" />
			<input type="submit" value="Ajouter" />
		</form>
		${footer}
	`);
    return;
  }

  //   ACCUEIL
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  res.end(`
		${header}
		<h1>Liste des utilisateurs</h1>
		<ul>
		${customUsers.map((u) => `<li><a href="/${u.nom}">${u.nom}</a></li>`).join("")}
		</ul>

		<a href="/add-user">Ajouter un utilisateur</a>
		${footer}
	`);
});

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}`);
});
