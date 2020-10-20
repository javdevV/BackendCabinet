const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../../models/user.model');
var async = require('async');
var crypto = require('crypto');
var mailingService = require('../../../config/sendgrid.config');

class ForgotController {
    constructor() {}

    sendEmailForForgottenPassword(req, res, next) {

        async.waterfall(
            [
                function(done) {
                    crypto.randomBytes(20, function(err, buf) {
                        var token = buf.toString("hex");
                        done(err, token);
                    });
                },
                function(token, done) {
                    User.findOne({
                        email: req.body.email
                    }, function(err, user) {
                        if (!user) {
                            var responseObjectError = {
                                error: "No account with that email address exists."
                            };
                            return res.status(404).json(responseObjectError);
                        }

                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save(function(err) {
                            done(err, token, user);
                        });
                    });
                },
                function(token, user, done) {
                    let subject = "Node.js Password Reset";
                    let mailBody = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/forgot/reset/' + token + '\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    let to = user.email;
                    let mailResponse = res.json({
                        info: "An e-mail has been sent to " + user.email +
                            " with further instructions.",
                        "token reset code": token
                    });
                    mailingService.sendEmail(subject, mailBody, to, mailResponse);
                }
            ],
            function(err) {
                if (err) return next(err);
                res.json({
                    response: "No mail has been sent "
                });
            }
        );

    }


    generateResetPassword(req, res, next) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                var responseObjectError = {
                    error: "No account with that email address exists."
                };
                return res.status(404).json(responseObjectError);
            }
            res.render('reset', {
                user: req.user
            });
        });
    }


    async sendEmailToUserAfterChangingPassword(req, res, next) {
        try {
            let user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {})
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
            let subject = "Your password has been changed";
            let mailBody = 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            let to = user.email;
            let mailResponse = res.json({
                success: "Success! Your password has been changed "
            });
            await user.save(
                mailingService.sendEmail(subject, mailBody, to, mailResponse)

            );
        } catch (error) {
            res.status(500).json({
                error: err
            });
            throw error
        }
    }


}

module.exports = ForgotController