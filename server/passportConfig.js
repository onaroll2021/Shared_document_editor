// const mongoose = require("mongoose");
const User = require("./User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) {
          console.log("Badddd");
          return done(null, false);
        }
        console.log("user", user);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            console.log("Goood");
            return done(null, user);
          } else {
            console.log("Falllllse");
            return done(null, false);
          }
        });
      });
    })
  );

  // passport.use(new localStrategy(
  //   function(username, password, done) {
  //     User.findOne({ username: username }, function (err, user) {
  //       if (err) { return done(err); }
  //       if (!user) { return done(null, false); }
  //       // if (!user.verifyPassword(password)) { return done(null, false); }
  //       return done(null, user);
  //     });
  //   }
  // ));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      // const userInformation = {
      //   username: user.username,
      // };
      cb(err, user);
    });
  });
};