const express = require('express');
const router = express.Router();

var ForgotController = require('../controllers/Authentication/ForgotController');
var ForgotController = new ForgotController();

/**
 * @api {POST} /forgot send email for forgotten password
 * @field email
 * @apiName Forgot
 * @apiGroup API
 * 
 */
router.post('/', ForgotController.sendEmailForForgottenPassword);


/**
 * @api {GET} /reset/ Generate reset password
 * @param token
 * @param password
 * @param confirm
 * 
 * @apiName RESET
 * @apiGroup API
 * 
 */
router.get('/reset/:token', ForgotController.generateResetPassword);


/**
 * @api {POST} /reset/ send email to user after changing password.
 * @param token
 * @param password
 * @param confirm
 * 
 * @apiName RESET
 * @apiGroup API
 * 
 */
router.post('/reset/:token', ForgotController.sendEmailToUserAfterChangingPassword);

module.exports = router