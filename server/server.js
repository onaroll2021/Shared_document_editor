const PORT = 3001;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./Document");
const User = require("./User");
const { findDocumentByUserID, findUserByID } = require("./queries");
const { response } = require("express");

//--------------------------------- Begin of MIDDLEWARE ------------------------------------------
const app = express();
app.use(express.urlencoded({ extended: true })); 
// Configure Sessions Middleware
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
// Configure More Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


const server = http.createServer(app);
const io = socketio(server);

//--------------------------------- END of MIDDLEWARE ------------------------------------------
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

//select data
findDocumentByUserID("63866ba3d03a71f9898745b8");
findUserByID("63866ba3d03a71f9898745b8");

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.get('/users/dashboard');

app.get("/Login");

app.get("/register");

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

app.post('/register', (req, res) => {
  User.findOne({username: req.body.username}, async (err, doc) => {
    if(err) throw err;
    if(doc) res.send("User Already Exists");
    if(!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
      });
      await newUser.save();
      res.send("user created!")
    }
  })
});

app.get("/user", (req, res) => {
  res.send(req.user);
  console.log(req.body)
})

