const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
var AuthenticationController = require('../controllers/Authentication/AuthenticationController');
var AuthenticationController = new AuthenticationController();
var validator = require('../middleware/AuthenticationChecker');
/**
 * @api {POST} / Creating New ACCOUNT
 * @apiName Register
 * @apiGroup API
 * 
 */
router.post('/register', validator.registerCheck,
    AuthenticationController.register
);


/**
 * @api {POST} / Sign in 
 * @apiName Login
 * @apiGroup API
 * 
 */
router.post('/login', validator.loginCheck, AuthenticationController.login)

/**
 * @api {POST} / Sign out
 * @apiName Logout
 * @apiGroup API
 * 
 */

router.get('/logout', auth, AuthenticationController.logout);

/**
 * @api {GET} GET api/user 
 * @desc User informatios
 * @access Public
 */
router.get('/', auth, AuthenticationController.getUserInfo);




module.exports = router