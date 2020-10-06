const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // to generate token
const bcrypt = require('bcryptjs'); // encrypt password
// Check validation for requests
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar'); // get user image by email
const auth = require('../middleware/auth');
// Models
const User = require('../models/User');

// @route   POST api/user/register
// @desc    Register user
// @access  Public
/**
 * @api {POST} / Creating New ACCOUNT
 * @apiName Register
 * @apiGroup API
 * 
 */
router.post('/register', [
        // validation
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({
            min: 6,
        }),
    ],
    async(req, res) => {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        // get name and email and password from request
        const { name, email, password } = req.body;

        try {
            // Check if user already exist
            let user = await User.findOne({ email });

            // If user exist
            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exists',
                    }, ],
                });
            }

            // If not exists
            // get image from gravatar
            const avatar = gravatar.url(email, {
                s: '200', // Size
                r: 'pg', // Rate,
                d: 'mm',
            });

            // create user object
            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // encrypt password
            const salt = await bcrypt.genSalt(10); // generate salt contains 10
            // save password
            user.password = await bcrypt.hash(password, salt); // use user password and salt to hash password
            //save user in databasw
            await user.save();

            // payload to generate token
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET, {
                    expiresIn: 360000, // for development for production it will 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST api/user/login
// @desc    login user
// @access  Public
/**
 * @api {POST} / Sign in 
 * @apiName Login
 * @apiGroup API
 * 
 */

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid credentials' }]
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid credentials' }]
            })
        }
        // payload for jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ 'connected': true, token })
            }
        )
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})




// @route GET api/user/logout
// @desc Logout user
// @access Public 
/**
 * @api {POST} / Sign out
 * @apiName Logout
 * @apiGroup API
 * 
 */

router.get('/logout', auth, function(req, res) {
    req.redirect('/');
});
// @route   POST api/user
// @desc    user informations
// @access  Private
router.get('/', auth, async(req, res) => {
    try {
        // get user info by id 
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(err.message);
        res.status(500).send('server error')
    }
})




module.exports = router