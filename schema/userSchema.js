const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
    }
});

const User = mongoose.model("users5", userSchema);

module.exports = User;