const { Schema, model } = require("mongoose");

const Document = new Schema({
  URL: {
    required: true,
    type: String,
  },

  data: {
    required: true,
    type: Object,
  },

  creator: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  veiw_access: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  edit_access: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  share_access: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  access_level: {
    type: Array,
    default: [],
  },

  dateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Document", Document);
