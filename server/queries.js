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
  const users = await User.find({ email: email });
  return findDocumentByUserID(users[0]._id);
};

//return whole user
const findUserByEmail = async (email) => {
  let userarry = await User.find({ email: email });
  return userarry;
};

Document.updateOne({ id: "documentId" }, { title: "Carl Benson" }).then(
  (meg) => {
    console.log(meg);
  }
);

const findByTitle = async (text) => {
  let seachtext = await Document.find({
    title: { $regex: text, $options: "i" },
  });
  return seachtext;
};

module.exports = {
  findDocumentByUserID,
  findUserByID,
  findDocumentByEmail,
  findUserByEmail,
  findByTitle,
};
