const mongoose = require('mongoose');
const {
    Number,
    Boolean,
    Date
} = mongoose.Schema.Types;

const users = require('./User.js');

const carSchema = mongoose.Schema({
    car_name: {
        type: String,
        required: true,
    },
    car_model: {
        type: String,
        required: true,
    },
    licence: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
    },
    comfortable: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    car_image: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    passengers: {
        type: [users],
        required: true,
    }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;