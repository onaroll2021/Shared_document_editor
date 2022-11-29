const {Schema, model } = require('mongoose')

const Document = new Schema ({
  data: Object,
  URL: String
})

module.exports = model("Document", Document)