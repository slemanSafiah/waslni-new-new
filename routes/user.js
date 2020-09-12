const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/update_info', async (req, res) => {
    try {
        const updated_user = await User.updateOne(
            { number: req.body.number },
            {
                $set: { name: req.body.name, gender: req.body.gender, age: req.body.age }
            })
        res.json({ sucess: 1, data: updated_user });
    } catch (error) {
        res.json({ sucess: 0, message: error })
    }
})

module.exports = router;