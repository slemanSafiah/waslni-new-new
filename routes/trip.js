const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const User = require('../models/User');
const axios = require('axios');
var ACCESS_TOKEN = "pk.eyJ1IjoidGFtYXJhamFtbW91bCIsImEiOiJja2NxMG1kNm8xMGtzMnNsbWExbGtpbm8zIn0.bgQ23ChS-u88zfS7dm6Fbw";


var trps = [];
var tr = {};
router.post('/get_trips_by_driver', async (req, res) => {
    try {
        const trips = await Trip.find({
            driver_number: req.body.number
        });
        Promise.all(trips.map(item => {
            return anAsyncFunction(item);
        })).then(() => res.json({
            sucess: 1,
            data: trps
        }));

    } catch (err) {
        console.log(err);
        res.json({
            sucess: 0,
            message: err
        });
    }
})

router.post('/get_trips_by_user', async (req, res) => {
    try {
        const trips = await Trip.find({
            user_number: req.body.number
        });
        Promise.all(trips.map(item => {
            return anAsyncFunction(item);
        })).then(() => res.json({
            sucess: 1,
            data: trps
        }));
    } catch (err) {
        res.json({
            sucess: 0,
            message: err
        });
    }
})


const anAsyncFunction = async item => {

    var b = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + item.source_long + ', ' + item.source_lat + '.json?access_token=' + ACCESS_TOKEN);
    var a = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + item.dest_long + ', ' + item.dest_lat + '.json?access_token=' + ACCESS_TOKEN);
    if (b.data.features.length != 0)
        tr.from = b.data.features[0].place_name;
    if (a.data.features.length != 0)
        tr.to = a.data.features[0].place_name;
    tr.driver_number = item.driver_number;
    tr.user_number = item.user_number;
    tr.date = item.date;
    trps.push(tr);
    return Promise.resolve('ok');
}

module.exports = router;