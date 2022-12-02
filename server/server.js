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
} = require("./queries");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
require("dotenv").config();

const { resolve } = require("path");
const nodemailer = require("nodemailer");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//const cors = require("cors");

//CONFIG FOR MAILING
require("dotenv").config()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
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
//app.use(cors());

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

const defaultValue = "";

async function findOrCreateDocument(URL) {
  const findUserarry = await findUserByEmail("abc@mail.com");

  if (URL == null) return;
  const document = await Document.findOne({ URL: URL });
  if (document) return document;
  return await Document.create({
    URL: URL,
    data: defaultValue,
    creator: findUserarry[0]._id,
  });
}

//select data
//findDocumentByUserID("63866ba3d03a71f9898745b8");
//async function aaa() {
//  const aa = findUserByID("63866ba3d03a71f9898745b8");
//  console.log("aa", aa);
//}
//console.log("11111", findDocumentByEmail("lining04111223@gmail.com"));

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
        // console.log(req.user);
        // return res.redirect(`/users/dashboard`);
      });
    }
  })(req, res);
});

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect("/users/dashboard");
//   });

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
  const findDocument = await findDocumentByEmail(req.user.email);
  const dataForDashboard = { userDocuments: findDocument, user: req.user };
  //console.log("aaaaa", dataForDashboard); // The req.user stores the entire user that has been authenticated inside of it.
  res.send(dataForDashboard);
});

//nodemailer part
const fs = require('fs');
const path = require('path');
const sendMail = require('./gmail');

const main = async (text) => {

  const options = {
    to: 'luke.li.9499@gmail.com',
    subject: 'Hello Luke 🚀',
    html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> /n ${text}</p>`,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Luke Li' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };

  const messageId = await sendMail(options);
  return messageId;
};

app.post("/api/send_mail", async (req, res) => {
  let { text } = req.body;
  main(text)
  .then((messageId) => console.log('Message sent successfully:', messageId))
  .catch((err) => console.error(err));
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

