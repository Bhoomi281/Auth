const express = require("express");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userCollection = require("./routes/user");
const SERVER_PORT = process.env.PORT || 8080;
const SECRET_JWT_CODE = "asnjjhhqreywejklc";
mongoose.connect("mongodb://localhost:27017/user").then(()=> {
    console.log("Successfully connected to db")
}).catch(()=> {
    console.log("failed to connect to db")
});
const app = express()
app.use(bodyParser.json());

app.listen(SERVER_PORT, ()=> {
    console.log("Server started on" + SERVER_PORT);
});
 app.use("./user", userCollection);