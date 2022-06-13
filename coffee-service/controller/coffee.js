const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');
const { body, validationResult } = require('express-validator');
const helper = require('../helper');

router.get('/', function (req, res, next) {

var page = req.query.page || 1
var listPerPage = req.query.listPerPage || 10

console.log('listPerPage', listPerPage,page);

const offset = helper.getOffset(page, listPerPage);

     connection.query(`SELECT id, title, description, image, ingredients
    FROM coffee LIMIT ${offset},${listPerPage}`, function (err, rows) {

        if (err) {
            // throw err;
            return res.status(400).send({
                success: false,
                msg: err
            });

        } else {
            const data = helper.emptyOrRows(rows);
            const meta = {page};
            return res.status(200).send({
                success: true,
                msg: 'Coffee get successfully!',
                data: data,
                meta:meta
            });
        }
    });
});

router.post('/add',

    body('title').not().isEmpty().withMessage('Title field cannot be empty'),
    body('description').not().isEmpty().withMessage('Description field cannot be empty'),
    body('image').not().isEmpty().withMessage('Image field cannot be empty'),
    body('ingredients').not().isEmpty().withMessage('Ingredients field cannot be empty'),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                msg: 'Validation failed'
            });
        }

        connection.query(`INSERT INTO coffee (title, description, image, ingredients) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.image}', '${req.body.ingredients}')`,
            //if(err) throw err
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        msg: err
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        msg: 'Coffee created successfully!',
                        data: req.body
                    });
                }
            }
        );
    });

module.exports = router
