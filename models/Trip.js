const mongoose = require('mongoose');
const {
    Number,
    Boolean,
    Date
} = mongoose.Schema.Types;

const tripSchema = mongoose.Schema({
    driver_number: {
        type: String,
        required: true,
    },
    user_number: {
        type: String,
        required: true,
    },
    source_lat: {
        type: String,
        required: true,
    },
    source_long: {
        type: String,
        required: true,
    },
    dest_lat: {
        type: String,
        required: true,
    },
    dest_long: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;