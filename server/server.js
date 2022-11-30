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
const {
  findDocumentByUserID,
  findUserByID,
  findDocumentByEmail,
  findUserByEmail,
} = require("./queries");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
// const bodyParser = require("body-parser");
const User = require("./User");

//--------------------------------- Begin of MIDDLEWARE ------------------------------------------
const app = express();
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server);

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
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
  const findUserarry = await findUserByEmail("lining04111223@gmail.com");

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
////findUserByID("63866ba3d03a71f9898745b8");
//findDocumentByEmail("lining04111223@gmail.com");
// Routes
app.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // res.send("Successfully Authenticated");
        // console.log(req.user);
        return res.redirect(`/users/dashboard`);
      });
    }
    
  })(req, res, next);
});

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect("/users/dashboard");
//   });

app.post("/signup", (req, res) => {
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
      res.send("User Created");
      res.redirect("/login");
    }
  });
});

app.get("/users/dashboard", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

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

