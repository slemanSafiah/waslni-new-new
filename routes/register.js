const express = require('express');
const hash = require('bcryptjs');
const Driver = require('../models/Driver');
const User = require('../models/User');
const router = express.Router();

router.post('/user', (req, res) => {
    User.findOne({ number: req.body.number })
        .then((saved) => {
            if (saved) {
                res.status(422).json({ sucess: 0, error: "error" });
            }
            else {
                const salt = 12;
                hash.hash(req.body.password, salt).then((new_password) => {
                    const user = new User({
                        name: req.body.name,
                        number: req.body.number,
                        gender: req.body.gender,
                        age: req.body.age,
                        password: new_password
                    })
                    try {
                        const savedUser = user.save()
                        res.json({ sucess: 1, data: savedUser });
                    } catch (error) {
                        res.json({ sucess: 0, message: error });
                    }
                })
            }
        })
        .catch((err) => console.error(err));
})


router.post('/driver', (req, res) => {
    Driver.findOne({ number: req.body.number })
        .then((saved) => {
            if (saved) res.status(422).json({ sucess: 0, error: "error" });
            else {
                const salt = 12;
                hash.hash(req.body.password, salt).then((new_password) => {
                    const driver = new Driver({
                        name: req.body.name,
                        number: req.body.number,
                        gender: req.body.gender,
                        age: req.body.age,
                        password: new_password
                    })
                    try {
                        const savedDriver = driver.save()
                        res.json({ sucess: 1, data: savedDriver })
                    } catch (error) {
                        res.json({ sucess: 0, message: error });
                    }
                })
            }
        })
        .catch((err) => console.error(err));
})

module.exports = router;