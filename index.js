const http = require("http");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function requestListener(req, res) {
	const filename = `.${req.url}.html`;
	readFile(filename)
		.catch((error) => {
			console.log(error);
			respond404(res);
		})
		.then(() => {
			console.log("success");
			res.end();
		});
}

function respond404(res) {
	readFile("./404.html").then((data) => {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.write(data);
		res.end();
	});
}

http.createServer(requestListener).listen(8080);
