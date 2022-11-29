const PORT = 3001;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./Document");
const User = require("./User");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//create mongoose connection
mongoose
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
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findOneAndUpdate({ URL: documentId }, { data: data });
    });
  });
});

///////////////////////
//const user1 = new User({
//  _id: new mongoose.Types.ObjectId(),
//  name: "Ning Li",
//  email: "lining04111223@gmail.com",
//  password: "123",
//  profilePic: "12234556787654321",
//});

//user1
//  .save()
//  .then(() => {
//    console.log("Saved to MongoDB.");
//  })
//  .catch((err) => {
//    console.log("saved Failed.");
//    console.log(err);
//  });

const defaultValue = "";

//findOrCreateDocument
async function findOrCreateDocument(URL) {
  if (URL == null) return;
  const document = await Document.findOne({ URL: URL });
  if (document) return document;
  return await Document.create({
    URL: URL,
    data: defaultValue,
    creator: "63866ba3d03a71f9898745b8",
  });
}

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
