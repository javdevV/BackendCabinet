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
        subject: subject, //"Node.js Password Reset",
        text: text
            // 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            // 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            // 'http://' + req.headers.host + '/forgot/reset/' + token + '\n\n' +
            // 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
        res.json(mailResponse);
    });
}