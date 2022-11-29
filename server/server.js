const PORT = 3001;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./Document")

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//const io = require("socket.io")(3001, {
//  cors: {
//    origin: "http://localhost:3000",
//    methods: ["GET", "POST"],
//  },
//});

mongoose
  //.connect("mongodb://localhost/google-docs-clone", {
  .connect(
    "mongodb+srv://william0225:3vcTf%40-hxTXRak3@cluster0.ixblkvn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB atlas.");
  })
  .catch((err) => {
    console.log("Connected Failed.");
    console.log(err);
  });
// socket connect in server
io.on("connection", (socket) => {
  socket.on('get-document', async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async data => {
      await Document.findOneAndUpdate({ URL: documentId }, { data })
    })
  })
});

const defaultValue = ""

async function findOrCreateDocument(URL) {
  if (URL == null) return;
  const document = await Document.findOne( { URL: URL } )
  if (document) return document
  return await Document.create({ URL: URL, data: defaultValue})
}

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

