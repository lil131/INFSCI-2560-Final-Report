const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProgressSchema = new Schema({
  user_id: String,
  progresses: Object
}, { strict: false });

const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = Progress;
