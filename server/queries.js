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

const findByTitle = async (text) => {
  let seachtext = await Document.find({
    title: { $regex: text, $options: "i" },
  });
  return seachtext;
};

const changeTitleByURL = async (title, URL) => {
  let changeTitle = await Document.updateOne({ URL: URL }, { title: title });
  return changeTitle;
};

const addEditorByURL = async (email, URL, viewOnly) => {
  
  const editor = await findUserByEmail(email);
  const document = await Document.findOne({ URL: URL });
  // console.log("document!!!: ", document);
  if (viewOnly) {
    document.view_access.push(editor[0]._id);
    const addEditor = await document.save();
    return addEditor;
  } else {
    document.view_edit_access.push(editor[0]._id);
    const addEditor = await document.save();
    return addEditor;
  }
};

module.exports = {
  findDocumentByUserID,
  findUserByID,
  findDocumentByEmail,
  findUserByEmail,
  findByTitle,
  changeTitleByURL,
  addEditorByURL,
};
