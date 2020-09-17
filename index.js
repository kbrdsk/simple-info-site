const http = require("http");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function requestListener(req, res) {
	const validPath =
		req.url === "/"
			? "./index.html"
			: req.url === "/about" || req.url === "/contact-me"
			? `.${req.url}.html`
			: null;
	if (!validPath) respond404(res);
	else
		readFile(validPath)
			.catch((error) => {
				console.log(error);
			})
			.then((data) => {
				console.log("success");
				respondSuccess(res, data);
			});
}

function respondSuccess(res, data) {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write(data);
	res.end();
}

function respond404(res) {
	readFile("./404.html").then((data) => {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.write(data);
		res.end();
	});
}

http.createServer(requestListener).listen(8080);
