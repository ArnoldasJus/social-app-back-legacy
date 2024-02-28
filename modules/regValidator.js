const sendRes = require("./sendRes");
const userDb = require("../schema/userSchema");

module.exports = (req, res, next) => {
    const {username, password} = req.body;
    const user = userDb.findOne({username});

    function containsUppercase(pass) {
        return /[A-Z]/.test(pass);
    }

    function containsSpecialChars(pass) {
        const specialChars = /[!@#$%^&*_+]/;
        return specialChars.test(pass);
    }

    if (username.length > 20 || username.length < 4)
        return sendRes(res, false, null, "Bad username length");
    if (password.length > 20 || password.length < 4)
        return sendRes(res, false, null, "Bad password length");
    if(user === username)
        return sendRes(res, false, null, "The username is already taken");
    if (!containsUppercase(password))
        return sendRes(res, false, null, "Password must contain uppercase letter");
    if (!containsSpecialChars(password))
        return sendRes(res, false, null, "Password must contain special character");

    next();
}