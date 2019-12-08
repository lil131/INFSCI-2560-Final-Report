const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var ProgressSchema = new Schema({
  user_id: ObjectId,
  progresses: Object
}, { strict: false });

const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = Progress;
