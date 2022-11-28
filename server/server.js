const PORT = 3001;
const http = require("http");
const express = require("express");
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

// socket connect in server
io.on("connection", (socket) => {
  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta);
  });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
