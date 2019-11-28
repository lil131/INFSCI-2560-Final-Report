const express = require('express');
const {
  isEmpty
} = require('lodash');
const Comment = require('../models/comment');
const router = express.Router();

/**
 * @route GET api/comment
 * @desc query all chapters
 */
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({});
    return res.json({
      comments
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error'
    });
  }
});

/**
 * @route POST api/chapter/
 * @desc Create chapter
 * For future refernece(query values as an array): https://docs.mongodb.com/manual/tutorial/query-arrays/
 */
router.post('/', async (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(403).json({
      message: 'Body should not be empty',
      statusCode: 403
    });
  }
  const {
    content
  } = req.body;
  const newComment = new Comment({
    content
  });

  newComment
    .save()
    .then(content => res.json({
      message: 'Data successfully saved',
      statusCode: 200,
      content: content
    }))
    .catch(err => console.log(err));
});

module.exports = router;
