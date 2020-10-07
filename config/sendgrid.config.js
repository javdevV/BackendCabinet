var nodemailer = require('nodemailer');


module.exports.sendEmail = function(subject, text, email, mailResponse) {
    var smtpTransport = nodemailer.createTransport({
        service: process.env.SENDGRID_SERVICE,
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    });
    var mailOptions = {
        to: email,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: subject,
        text: text
    };
    smtpTransport.sendMail(mailOptions, function(err) {
        res.json(mailResponse);
    });
}