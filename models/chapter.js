require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);

const QuestionSet = new Schema({
    statement: String,
    options: Array,
    correctAnswer: Number
});

const ChapterSchema = new Schema({
    title: String,
    content: Array,
    questionSets: [[QuestionSet]],
    Date: String
});
ChapterSchema.plugin(autoIncrement.plugin, 'Chapter');
const Chapter = mongoose.model("Chapter", ChapterSchema);

module.exports = Chapter;
