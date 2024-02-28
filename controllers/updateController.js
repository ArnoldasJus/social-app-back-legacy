const sendRes = require("../modules/sendRes");
const uuid = require("uuid");
const userDb = require("../schema/userSchema");
const bcrypt = require("bcrypt");

module.exports = {
    updateUsername: async (req, res) => {
        const {user, username} = req.body
        const isTaken = await userDb.findOne({username});

        if(isTaken !== null) {
            return sendRes(res, false, null, "The username is already taken");
        }

        const newUser = await userDb.findOneAndUpdate(
            {_id: user.userId},
            {$set: {username}},
            {new: true}
        )
        sendRes(res, true, newUser, "username updated")
    },
    updateImage: async (req, res) => {
        const {user, image} = req.body
        //const myUser = await userDb.findOne({_id: user.userId})
        //if (!user) return res.send({success: false})

        const newUser = await userDb.findOneAndUpdate(
            {_id: user.userId},
            {$set: {image}},
            {new: true}
        )

        sendRes(res, true, newUser, "user img updated")
    },
    updatePassword: async (req, res) => {
        const {user, password} = req.body
        //const myUser = await userDb.findOne({_id: user.userId})
        //if (!user) return res.send({success: false})

        function containsUppercase(pass) {
            return /[A-Z]/.test(pass);
        }

        function containsSpecialChars(pass) {
            const specialChars = /[!@#$%^&*_+]/;
            return specialChars.test(pass);
        }

        if (password.length > 20 || password.length < 4)
            return sendRes(res, false, null, "Bad password length");

        if (!containsUppercase(password))
            return sendRes(res, false, null, "Password must contain uppercase letter");

        if (!containsSpecialChars(password))
            return sendRes(res, false, null, "Password must contain special character");

        // Hash password
        const hash = await bcrypt.hash(password, 3);
        const newUser = await userDb.findOneAndUpdate(
            {_id: user.userId},
            {$set: {password:hash}},
            {new: true}
        )

        sendRes(res, true, newUser, "Password updated");
    }
}