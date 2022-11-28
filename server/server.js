const PORT = 3001;
const http = require("http");
const express = require("express");
/// require socket.io
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//const io = require("socket.io")(3001, {
//  cors: {
//    origin: "http://localhost:3000",
//    methods: ["GET", "POST"],
//  },
//});

io.on("connection", (socket) => {
  console.log("Hi");
});

app.get("/", (req, res) => {
  return res.json({ greetings: "hello world" });
});

////////////?
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
