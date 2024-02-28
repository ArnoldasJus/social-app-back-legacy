const sendRes = require("../modules/sendRes");
const uuid = require("uuid");
const userDb = require("../schema/userSchema");
const messageDb = require("../schema/messageSchema");

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userDb.find()
        sendRes(res, true, users, null)
    },
    setUser: async (req, res) => {
        const {name} = req.body
        const user = await userDb.findOne({username: name})
        sendRes(res, true, user, "user")
    },
    sendMessage: async (req, res) => {
        const {username, content, selectedUser, time} = req.body

        //const myUser = await userDb.findOne({username: user.username})
        // sendRes(res, true, user, "user")

        const message = new messageDb({
            username,
            content,
            selectedUser,
            time
        })

        await message.save();

        console.log(message)
        console.log(req.body)
        sendRes(res, true, null, "Message sent")
    },
    getAllMessages: async (req, res) => {
        const messages = await messageDb.find()
        //const myUser = await userDb.findOne({_id: userId.username})
        //const messages = await messageDb.find({selectedUser: myUser.username})
        //console.log(req)
        console.log(messages)
        sendRes(res, true, messages, null)
    },
    getMyMessages: async (req, res) => {
        const {user} = req.body

        const myUser = await userDb.findOne({_id: user.userId})
        const messages = await messageDb.find({selectedUser: myUser.username})

        sendRes(res, true, messages, null)
    }
}