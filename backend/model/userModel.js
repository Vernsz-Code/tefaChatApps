const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max: 100,
    },
    password: {
        type: String,
        required: true,
        max: 100,
    },
})

module.exports = mongoose.model("Users", userSchema);