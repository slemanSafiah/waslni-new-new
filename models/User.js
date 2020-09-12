const mongoose = require("mongoose");

const {
  Number,
  Boolean
} = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;