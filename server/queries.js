const Document = require("./Document");
const User = require("./User");

const findDocumentByUserID = async (id) => {
  let documents = [];
  const editDocuments = await Document.find({ view_edit_access: id }).populate("creator").populate("view_access").populate("view_edit_access");
  const viewDocuments = await Document.find({ view_access: id }).populate("creator").populate("view_access").populate("view_edit_access");
  if (editDocuments.length) {
    editDocuments.forEach(doc => documents.push(doc))
  };
  if (viewDocuments.length) {
    viewDocuments.forEach(doc => documents.push(doc))
  };
  const sortedDoc = documents.sort(
    (objA, objB) => Number(objB.dateTime) - Number(objA.dateTime)
  );
  return sortedDoc;
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
  // console.log("editor", editor)
  if (viewOnly) {
    document.view_access.push(editor[0]._id);
    const addEditor = await document.save();
    return addEditor;
  } else {
    document['view_edit_access'].push(editor[0]._id);
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
