const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);

const io = new Server(server);


// Socket.io

io.on("connection", (socket) => {
	socket.on('user-message', (message) => {
        // console.log("A new user message: ", message)  -> take a msg server
        io.emit('message', message) // msg gives to all users
    })
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
	return res.sendFile(path.resolve("./public/index.html"));
});

server.listen(3000, () => {
	console.log("Server started at PORT: 3000");
});
