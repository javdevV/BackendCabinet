const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../../models/user.model');
const { validationResult } = require('express-validator');

class AuthenticationController {
    constructor() {}

    async register(req, res) {
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

    async login(req, res) {
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
                    id: user.id,
                    email: user.email,
                    role: user.role
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
    }
    async getUserInfo(req, res) {
        try {
            // get user info by id 
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (error) {
            console.log(err.message);
            res.status(500).send('server error')
        }
    }
    logout(req, res) {
        req.redirect('/');
    }

}
module.exports = AuthenticationController