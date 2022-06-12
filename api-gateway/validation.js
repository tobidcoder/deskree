const { check } = require('express-validator');
 
exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isEmpty().isLength({ min: 6 })
]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isEmpty().isLength({ min: 6 })
 
]