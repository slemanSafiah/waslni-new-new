const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
    const output = `
          <p>You have a new contact request</p>
          <p>Name : ${req.body.name}</p>
          <p>Email : ${req.body.email}</p>
          <p>Phone Number : ${req.body.number}</p>
          <p>Message : ${req.body.message}</p>
      `;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        tls: true,
        auth: {
            user: "slemansafiah45@gmail.com",
            pass: "5771125sss",
        },
    });

    let mailOptions = {
        from: ` ${req.body.email}`, // sender address
        to: "waslniproject@gmail.com", // list of receivers
        subject: "E-mail message", // Subject line
        text: `Hello it is ${req.body.name}`, // plain text body
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        res.render("contact", {
            msg: "Email has been sent"
        });
    });
});

module.exports = router;