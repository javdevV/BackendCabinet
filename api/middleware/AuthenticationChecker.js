const { check, validationResult } = require('express-validator');



module.exports.registerCheck = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({
        min: 6,
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },

];
module.exports.loginCheck = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
]