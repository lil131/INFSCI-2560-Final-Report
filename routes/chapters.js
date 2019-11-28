const express = require('express');
const {
  isEmpty
} = require('lodash');
const jwt = require("jsonwebtoken");
const Chapter = require('../models/chapter');
const router = express.Router();
require('dotenv').config();

/**
 * @route GET api/chapter
 * @desc query all chapters
 */
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find({});
    return res.json({
      chapters
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
    title,
    content,
    questionSets
  } = req.body;
  const newChapter = new Chapter({
    title,
    content,
    questionSets,
    date: Date.now()
  });

  newChapter
    .save()
    .then(chapter => res.json({
      message: 'Data successfully saved',
      statusCode: 200,
      chapter: chapter
    }))
    .catch(err => console.log(err));
});

module.exports = router;
