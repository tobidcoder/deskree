const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

router.post('/register',
    body('name').not().isEmpty().withMessage('Email field cannot be empty'),
    body('email').isEmail().normalizeEmail().withMessage('Email field cannot be empty'),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                msg:'Validation failed'
            });
        }

        db.query(
            `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
                req.body.email
            )});`,
            (err, result) => {
                if (result.length) {
                    return res.status(409).send({
                        success: false,
                        msg: 'This user is already in use!'
                    });
                } else {
                    // username is available
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({
                                success: false,
                                msg: err
                            });
                        } else {
                            // has hashed pw => add to database
                            db.query(
                                `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(
                                    req.body.email
                                )}, ${db.escape(hash)})`,
                                (err, result) => {
                                    if (err) {
                                        // throw err;
                                        return res.status(400).send({
                                            success: false,
                                            msg: err
                                        });
                                    }
                                    return res.status(200).send({
                                        success: true,
                                        msg: 'User registered successfully!'
                                    });
                                }
                            );
                        }
                    });
                }
            }
        );
    });

router.post('/login', 
    body('email').isEmail().normalizeEmail().withMessage('Email field cannot be empty'),
    body('password').not().isEmpty().withMessage('Password field cannot be empty'),
    
 (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
            msg:'Validation failed'
        });
    }

    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                // throw err;
                return res.status(400).send({
                    success: false,
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    success: false,
                    msg: 'Email or password is incorrect!'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        // throw bErr;
                        return res.status(401).send({
                            success: false,
                            msg: 'Email or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            success: true,
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        success: false,
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});

router.get('/me', signupValidation, (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({
            success: false,
            message: "Please provide the token",
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
    db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ success: true, data: results[0], message: 'Fetch Successfully.' });
    });
});



router.post('/generate-coffee',signupValidation,(req, res, next) => {
    db.query(
        `INSERT INTO coffee (title, description, image, ingredients) VALUES ('${req.body.name}', ${db.escape(
            req.body.email
        )}, ${db.escape(hash)})`,
        (err, result) => {
            if (err) {
                // throw err;
                return res.status(400).send({
                    success: false,
                    msg: err
                });
            }
            return res.status(200).send({
                success: true,
                msg: 'coffeee registered successfully!'
            });
        }
    );
});

module.exports = router