'use strict';
const nodemailer = require('nodemailer');

var mail = () => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: '...', // account.user, // generated ethereal user
                pass: '...' // account.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Kumar A 👻" <kumarabhirup5@yahho.com>', // sender address
            to: 'bar@example.com, baz@example.com, kumarabhirup5@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Your mail client does not support HTML emails.', // plain text body
            html: `<!DOCTYPE html><html><head><style>h1{ color: red; } div.w{background:#eaeaea;padding:10px; border: 1px solid black; align-items: center;}</style></head><body><div class="w"><h1>Hey Kumar, how are you?</h1><img src="https://nodemailer.com/nm_logo_200x136.png"/></div></body></html>` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    // html to string

    // var fs = require('fs');
    // var file = fs.readFileSync(path, "utf8");
    // console.log(file);

}

export { mail }