const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    prefix: Number,
    staffID: Number,
    permission: Number,
    nickname: String,
    branches: Array,
    email: String,
    password: String,
    grade: Number,
    phone: Number,
    Date: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
