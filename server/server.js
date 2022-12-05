require("dotenv").config();
const PORT = process.env.PORT || 3001;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./Document");
const User = require("./User");
const {
  findDocumentByUserID,
  findUserByID,
  findDocumentByEmail,
  findUserByEmail,
  findByTitle,
  changeTitleByURL,
  addEditorByURL,
} = require("./queries");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const { resolve } = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set up authentication
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

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
  socket.on("get-document", async (documentId, userEmail) => {
    const document = await findOrCreateDocument(documentId, userEmail);
    socket.join(documentId);
    socket.emit("load-document", document);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findOneAndUpdate({ URL: documentId }, { data: data });
    });
  });
});

const defaultValue = "";

async function findOrCreateDocument(URL, email) {
  const findUserarry = await findUserByEmail(email);
  console.log("email", email);

  if (URL == null) return;
  const document = await Document.findOne({ URL: URL });
  if (document){
    if (document.view_access.includes(findUserarry[0]._id) || document.view_edit_access.includes(findUserarry[0]._id)) {
      return document;
    }
  };
  return await Document.create({
    URL: URL,
    data: defaultValue,
    creator: findUserarry[0]._id,
    view_edit_access: [findUserarry[0]._id],
  });
}

// Routes
app.post("/api/login", (req, res) => {
  console.log(req.body);
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res);
});

app.post("/api/signup", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      passport.authenticate("local", (err, user) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
          });
        }
      })(req, res);
    }
  });
});

app.get("/api/users/dashboard", async (req, res) => {
  // console.log("dash-get-req.user", req.user);
  const findDocument = await findDocumentByEmail(req.user.email);
  const search = await findByTitle("AA");
  // console.log("findDocument-server", findDocument)
  const dataForDashboard = {
    documents: findDocument,
    user: req.user,
    searchedDocuments: search,
  };
  //console.log("aaaaa", dataForDashboard); // The req.user stores the entire user that has been authenticated inside of it.
  res.send(dataForDashboard);
});

//change title
app.post("/api/users/changeTitle", async (req, res) => {
  // console.log("title", req.body.title);
  await changeTitleByURL(req.body.title, req.body.URL);
});

// gmail API
const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');

const main = async (text, email, senderName, receiverName) => {
  const options = {
    to: email,
    subject: `Hello ${receiverName} 🚀`,
    html: `<p>🙋🏻‍♀️  &mdash; ${senderName} shared a document with you: \n ${text}</p>`,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Luke Li' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };
  const messageId = await sendMail(options);
  return messageId;
};

//delete document
app.post("/api/users/delete", async (req, res) => {
  console.log("req.body", req.body)
  await Document.deleteOne({ _id: req.body.id})
  const findDocument = await findDocumentByEmail(req.body.user.email);
  const dataForDashboard = {
    documents: findDocument,
    user: req.body.user,
  }
    res.send(dataForDashboard);
})
//add editor

app.post("/api/send_mail", async (req, res) => {
  let { text, sendToEmail, url, viewOnly, senderName } = req.body;
  const receiver = await User.findOne({email: sendToEmail});
  const receiverName = receiver.username;
  addEditorByURL(sendToEmail, url, viewOnly)
  .then(() => main(text, sendToEmail, senderName, receiverName))
  .then((messageId) => console.log('Message sent successfully:', messageId))
  .catch((err) => console.error(err));
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
