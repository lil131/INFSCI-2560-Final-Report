const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetSchema = new Schema({
    userID: String,
    reset_password_token: String,
    reset_password_expires: Date
});

const Reset = mongoose.model('Reset', ResetSchema);

module.exports = Reset;