const mongoose = require('mongoose');
const {
    Number,
    Boolean,
    Date
} = mongoose.Schema.Types;

const chatSchema = mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;