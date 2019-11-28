const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Chapter = mongoose.model("Chapter", ChapterSchema);

module.exports = Chapter;
