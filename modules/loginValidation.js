const userDb = require("../schema/userSchema");
const sendRes = require("./sendRes");

module.exports = async (req, res, next) => {
    const {secret} = req.body;

    const userExist = await userDb.findOne({_id: secret});

    if(!userExist) return sendRes(res, false, null);

    req.body.username = userExist.username;

    next();
}