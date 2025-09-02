process.stdin.on('data', (chunk) => {
	const text = chunk.toString().replace("\n", "");
	
	if (!text.includes("exit")) {
		console.log(text)
		return
	}
	process.exit(0)
})

console.log("hello")



// const os = require("node:os")
//
// console.log(os.userInfo())
//
// process.env.EXEMPLE = "texte"
//
// process.stdout.write("ceci est un console.log")
//
// process.stderr.write("erreur")
// console.log(process.env.EXEMPLE)


//setTimeout(() => console.log("Asynchrone"), 1000)
// const showResult = () => {
// 	console.log(sum(5,2))
// }
//
// const sum  = (a,b) => {
// 	return a+b;
// }
//
//
//
// showResult();