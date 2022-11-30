const Document = require("./Document");
const User = require("./User");

const findDocumentByUserID = (id) => {
  Document.find({ creator: id }).then((data) => {
    console.log(data);
  });
};

const findUserByID = (id) => {
  User.find({ _id: id }).then((data) => {
    console.log(data);
  });
};

const findDocumentByEmail = (email) => {
  User.find({ email: email }).then((data) => {
    findDocumentByUserID(data[0]._id);
  });
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
