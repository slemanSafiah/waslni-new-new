const mongoose = require("mongoose");
const {
    Number,
    Boolean
} = mongoose.Schema.Types;

const driverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_available: {
        type: Boolean,
        default: false
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number,
    }
});
const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;