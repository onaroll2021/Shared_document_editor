const User = require("./User");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;


module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // User.findOne({username: username}), function (err, user) {
      //   if (err) throw err;
      //   if(!user) return done(null, false);
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err) throw err;
        //   if (result === true) {
        //     return done(null, user)
        //   } else {
        //     return done(null, false)
        //   }
        // })
      // }
      User.findOne({username: username})
      .then((user) => {
        if(!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      })
      .catch((err) => {
        throw err;
      })
    })
  )
    // passport requires it; to store cookie; take the user id from local strategy and store inside cookie
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  })
  // take a cookie and unwrap to return the user
  passport.deserializeUser((id,cb) => {
    User.findOne({_id: id}, (err,user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    })
  })
}
