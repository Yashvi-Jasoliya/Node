const express = require('express')
const app = express();

const connectDB = require("./db");
const usersRoute = require("./routes/usersRoute")
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT;

//body parser (parsing into json)
app.use(express.json());

// connected with DB
connectDB();

app.use("/api", usersRoute)

app.get("/", (req, res) => {
    console.log("Route handler ..........")
    res.send("Started in Route handler....")
})

app.listen(PORT, () => {
    console.log("Server started ...")
})