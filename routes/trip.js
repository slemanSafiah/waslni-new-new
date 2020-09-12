const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const User = require('../models/User');
const request = require('request');
const http = require('https');
var ACCESS_TOKEN = "pk.eyJ1IjoidGFtYXJhamFtbW91bCIsImEiOiJja2NxMG1kNm8xMGtzMnNsbWExbGtpbm8zIn0.bgQ23ChS-u88zfS7dm6Fbw";
var str;

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
        res.json({
            sucess: 1,
            data: trips
        });
    } catch (err) {
        res.json({
            sucess: 0,
            message: err
        });
    }
})


const anAsyncFunction = async item => {

    await http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + item.source_long + ', ' + item.source_lat + '.json?access_token=' + ACCESS_TOKEN,
        async resp => {
            var jsonData = '';
            await resp.on("data", (chunk) => {
                jsonData += chunk;
            }).on("end", () => {
                var obj = JSON.parse(jsonData);
                tr.from = obj.features[0].place_name;
                console.log("w1");
            });
        }).on("error", (err) => {
        console.log(err);
    })
    await http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + item.dest_long + ', ' + item.dest_lat + '.json?access_token=' + ACCESS_TOKEN,
        async resp => {
            var obj;
            var jsonData = '';
            await resp.on("data", (chunk) => {
                jsonData += chunk;
            }).on("end", () => {
                obj = JSON.parse(jsonData);
                tr.to = obj.features[0].place_name;
                console.log("w2");
                return Promise.resolve('ok');

            });
            console.log("w3");
        }).on("error", (err) => {
        console.log(err);
    });
    tr.driver_number = item.driver_number;
    tr.user_number = item.user_number;
    //  tr.from = "";
    //  tr.to = "";
    console.log("chelsea");
    trps.push(tr);
    return Promise.resolve('ok');
}

module.exports = router;