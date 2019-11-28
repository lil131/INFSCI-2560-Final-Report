require('dotenv').config();
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.MONGODB_URI);

autoIncrement.initialize(connection);

const CommentSchema = new Schema({
    content: String
});

CommentSchema.plugin(autoIncrement.plugin, 'Comment');
const Comment = connection.model('Comment', CommentSchema);

module.exports = Comment;
