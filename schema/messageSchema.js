const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    selectedUser: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        required: false,
        default: []
    }
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;