const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // When user makes action
    // he adds "authorization" token to headers key in fetch options
    const token = req.headers['authorization'];

    // Check if token exists, if not send error msg
    if(!token) return res.send({error: true, message: "No auth token"});

    // Take token and ACCESS_SECRET to unlock data from token
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {

        // Call back will have error and user objects

        // Error shows up if token is bad
        if(err) return res.send({error: true, message: "Auth error"});

        // User is data which was unlocked from token
        req.body.user = user;
        return next();
    });
}