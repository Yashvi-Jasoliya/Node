const express = require("express");
const app = express();
const port = 3000;

const route = require("./routes/route");

// mounting the routes
app.use("/api", route);

// loading middleware into app for parsing
// in-build middleware
app.use(express.json());

// middleware = login, auth, validation

const loginmiddleware = function (req, res, next) {
	console.log("Login....");
	next();
};

// loaded middleware in app
app.use(loginmiddleware);

const authmiddleware = function (req, res, next) {
	console.log("Authentication......");
	next();
	// res.send("Terminate the cycle of req and res")
};

app.use(authmiddleware);

const validationmiddleware = function (req, res, next) {
	console.log("Validation.....");
	next();
};

app.use(validationmiddleware);

app.get("/", (req, res) => {
	console.log("Runing Route handler.....");
	console.log(req.body);
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
