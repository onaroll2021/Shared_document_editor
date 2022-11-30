const { Schema, model } = require("mongoose");

const User = new Schema({
  username: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },

  profilePic: {
<<<<<<< HEAD
    type: String
=======
    type: String,
    // required: true,
>>>>>>> 784d43f7d06af504fad2417481cd5e1f54253374
  },

  documents: {
    type: Schema.Types.ObjectId,
    ref: "Document",
  },
});

<<<<<<< HEAD
module.exports = model("User", User);
=======
module.exports = model("User", User);
>>>>>>> 784d43f7d06af504fad2417481cd5e1f54253374
