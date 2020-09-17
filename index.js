const fs = require("fs");
const express = require("express");
const util = require("util");

const app = express();
const readFile = util.promisify(fs.readFile);

app.use(check404);
app.get("/", fileDelivery("./index.html"));
app.get("/about", fileDelivery("./about.html"));
app.get("/contact-me", fileDelivery("./contact-me.html"));
app.listen(8080);

async function check404(req, res, next) {
	if (["/", "/about", "/contact-me"].includes(req.url)) next();
	else res.end(await readFile("./404.html"));
}

function fileDelivery(filepath, res) {
	return async (req, res) => res.end(await readFile(filepath));
}
