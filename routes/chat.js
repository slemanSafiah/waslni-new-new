const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Driver = require('../models/Driver');
const User = require('../models/User');

router.post('/send_m', (req, res) => {
    try {
        Driver.findOne({ number: data.driver_number })
            .then((savesDriver) => {
                if (savesDriver) {
                    User.findOne({ number: data.user_number }).
                        then((savesUser) => {
                            if (savesUser) {
                                const chart = new Chat({
                                    driver_number: data.driver_number,
                                    user_number: data.user_number,
                                    message: data.message,
                                    date: Date.now()
                                });
                                try {
                                    const savedChat = chat.save();
                                    savedChat.then((saved) => console.log(saved));
                                } catch (error) {
                                    console.log(error);
                                }
                            }

                        });
                }
            })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
})

router.post('/get_driver_chat', (req, res) => {
    try {
        Driver.findOne({ number: req.body.driver })
            .then((savesDriver) => {
                if (savesDriver) {
                    const messages = Chat.find({ driver: req.body.driver }).then(messages => {
                        res.json({ messages })
                    })


                }
            })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
})

router.post('/get_client_chat', (req, res) => {
    try {
        Driver.findOne({ number: req.client })
            .then((savesDriver) => {
                if (savesDriver) {
                    const messages = Chat.find({ client: req.client }).then(messages => {
                        res.json({ messages })
                    })

                }
            })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;