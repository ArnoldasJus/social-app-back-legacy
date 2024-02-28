const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./router/mainRouter");
//require("./sockets/main");

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log("Connect success")
    }).catch(e => {
    console.log(e)
});

app.use("/", mainRouter);

app.listen(4000);