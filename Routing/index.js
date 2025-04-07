const express = require("express");
const app = express();
const port = 3000;


// app.get("/", (req, res) => {
// 	res.send("Heello World!");
// });

// app.get("/", (req, res) => {
// 	res.sendFile("./dummy.txt", {root: __dirname})
// });

// app.post("/items", (req, res) => {
// 	// res.send("Got a POST Request");
//     res.json({x:1, y:2, z:3})
// });

// app.put("/items/:id", (req, res) => {
// 	res.send("Got a PUT Request");
// });

// app.delete("/items/:id", (req, res) => {
// 	res.send("Got a DELETE Request");
// });


// localhost:3000/api -> get
// localhost:3000/api/items -> post
// localhost:3000/api/items/:1 -> put
// localhost:3000/api/items/:2 -> delete

const item = require('./routes/item')
const birds = require("./routes/birds");

app.use('/api', item)
app.use("/fill", birds);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
