//const nodemailer = require("nodemailer");

//  // Generate test SMTP service account from ethereal.email
//  // Only needed if you don't have a real mail account for testing
//  //let testAccount = await nodemailer.createTestAccount();

//  // create reusable transporter object using the default SMTP transport
//  function sendEmail(){
//return new Promise(res,rej)=>{
//const transporter = nodemailer.createTransport({
//    service: "gmail",
//    auth: {
//      user: "shared.document.editor@gmail.com", // generated ethereal user
//      pass: "qwerQWER", // generated ethereal password
//    },
//  });

//const mail_config= {
//    from: "shared.document.editor@gmail.com", // sender address
//    to: "laikening100@gmail.com", // list of receivers
//    subject: "Hello ✔", // Subject line
//    text: "Hello world?", // plain text body
//    html: "<b>Hello world?</b>", // html body
//  };

//  transporter.sendMail(mail_config,function(err,info){
//if(error){

//  return reject({message:`err occor`})
//}
//return reject({message:`sent success`})

//  }
//  )

//}

//  }
