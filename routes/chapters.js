const express = require('express');
const {
  isEmpty
} = require('lodash');
const jwt = require("jsonwebtoken");
const Chapter = require('../models/chapter');
const Progress = require('../models/progress');
const router = express.Router();
require('dotenv').config();

/**
 * @route GET api/chapters
 * @desc query all chapters
 */
router.get('/users/:user_id', async (req, res) => {
  try {
    const chapters = await Chapter.find({});
    const progresses = await Progress.findOne({user_id: req.params.user_id});
    return res.json({
      chapters, progresses,"user_id": req.params.user_id
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error'
    });
  }
});

/**
 * @route GET api/chapters
 * @desc query one chapter content and user progress
 */
router.get('/:chapter_id/users/:user_id', async (req, res) => {
  try {
    Chapter.findById(req.params.chapter_id, function(err, chapter_content) {
      Progress.findOne({user_id: req.params.user_id}, function(err, user_progress) {
        // TOOD error handle
        let p = user_progress.progresses
        return res.json({
          chapter_content, progress: user_progress.progresses
        });
      });
    });

    // return res.json({
    //   chapter, progress
    // });
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
