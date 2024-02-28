const sendRes = require("./sendRes");

module.exports = (req, res, next) => {
    const {username, password} = req.body;

    if (username.length > 20 || username.length < 4)
        return sendRes(res, false, null, "Bad username length");

    next();
}