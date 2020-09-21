const fs = require("fs");
const express = require("express");
const util = require("util");

const app = express();
const readFile = util.promisify(fs.readFile);

app.get("/", fileDelivery("./index.html"));
app.get("/about", fileDelivery("./about.html"));
app.get("/contact-me", fileDelivery("./contact-me.html"));
app.use(check404);
app.use(reportError);
app.listen(8080);

function check404(req, res) {
	readFile("./404.html")
		.then((data) => res.end(data))
		.catch((err) => reportError(err, req, res));
}

function fileDelivery(filepath) {
	return (req, res) =>
		readFile(filepath)
			.then((data) => res.end(data))
			.catch((err) => reportError(err, req, res));
}

function reportError(err, req, res) {
	res.end("There was an error.");
}
