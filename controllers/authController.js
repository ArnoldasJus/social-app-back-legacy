const bcrypt = require("bcrypt");
const userDb = require("../schema/userSchema");
const sendRes = require("../modules/sendRes");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        const {username, password, image} = req.body;

        // Hash password
        const hash = await bcrypt.hash(password, 3);
        const user = new userDb({
            username,
            password: hash,
            image
        })

        await user.save();
        sendRes(res, true);
        console.log(res)
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const user = await userDb.findOne({username});
        if(!user) return sendRes(res, false, null, "User doesn't exist");

        // Compare passwords
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch) return sendRes(res, false, null, "Wrong password");

        user.password = "";

        const token = jwt.sign({userId: user._id}, process.env.ACCESS_SECRET);

        sendRes(res, true, {user, token});
    },
    autologin: async (req, res) => {
        const {user} = req.body
        const myUser = await userDb.findOne({_id: user.userId})
        myUser.password = ""
        sendRes(res, true, {user: myUser})
    }
}