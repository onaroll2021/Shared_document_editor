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

//create new user
//const user1 = new User({
//  _id: new mongoose.Types.ObjectId(),
//  name: "Ning Li",
//  email: "lining04111223@gmail.com",
//  password: "123",
//  profilePic: "12234556787654321",
//});

//user1
//  .save()
//  .then(() => {
//    console.log("Saved to MongoDB.");
//  })
//  .catch((err) => {
//    console.log("saved Failed.");
//    console.log(err);
//  });

module.exports = {
  findDocumentByUserID,
  findUserByID,
  findDocumentByEmail,
  findUserByEmail,
};
