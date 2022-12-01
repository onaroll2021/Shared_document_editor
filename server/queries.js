const Document = require("./Document");
const User = require("./User");

const findDocumentByUserID = async (id) => {
  let documents = await Document.find({ creator: id }).populate("creator");
  return documents;
};

const findUserByID = async (id) => {
  let userarry = await User.find({ _id: id });
  return userarry;
};

const findDocumentByEmail = async (email) => {
  const documents = await User.find({ email: email });
  return findDocumentByUserID(documents[0]._id);
};

//return whole user
const findUserByEmail = async (email) => {
  let userarry = await User.find({ email: email });
  return userarry;
};

module.exports = {
  findDocumentByUserID,
  findUserByID,
  findDocumentByEmail,
  findUserByEmail,
};
