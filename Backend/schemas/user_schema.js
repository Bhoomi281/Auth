const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    mobile: Number
});
const user = mongoose.model("user", userSchema);
module.exports = {
    user
}