const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const loginValidator = require("../modules/loginValidation");
const authValidator = require("../modules/authValidator");
const regValidator = require("../modules/regValidator");
const generalController = require("../controllers/generalController");
const updateController = require("../controllers/updateController");
const jwtMiddle = require("../modules/jwtMiddle");

router.post("/register", regValidator, authController.register);
router.post("/login", authValidator, authController.login);
router.post("/autologin", jwtMiddle, authController.autologin);
//
// router.post("/createPost", jwtMiddle, generalController.createPost);
router.get("/users", generalController.getAllUsers);
router.get("/messages", generalController.getAllMessages);
// router.get("/user", jwtMiddle, generalController.getUser);
// router.post("/like", jwtMiddle, generalController.like);
// router.post("/comment", jwtMiddle, generalController.comment);
//router.post("/update", jwtMiddle, regValidator, generalController.updateUser);
router.post("/updateImage", jwtMiddle, updateController.updateImage);
router.post("/updateUsername", jwtMiddle, authValidator, updateController.updateUsername);
router.post("/updatePassword", jwtMiddle, updateController.updatePassword);

router.post("/sendMessage", jwtMiddle, generalController.sendMessage);
router.post("/setUser", jwtMiddle, generalController.setUser);
router.post("/myMessages", jwtMiddle, generalController.getMyMessages);

module.exports = router;