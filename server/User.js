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
    type: String,
  },

  documents: {
    type: Schema.Types.ObjectId,
    ref: "Document",
  },
});

module.exports = model("User", User);
