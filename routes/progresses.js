const express = require('express');
const {
  isEmpty
} = require('lodash');
const Progress = require('../models/progress');
const Chapter = require('../models/chapter');
const router = express.Router();

/**
 * @route GET api/progresses
 * @desc query all users' progress list
 */
router.get('/', async (req, res) => {
  try {
    const progresses = await Progress.find({});
    return res.json({
      progresses
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error'
    });
  }
});

/**
 * @route POST api/progresses/
 * @desc Create progress by user
 * For future refernece(query values as an array): https://docs.mongodb.com/manual/tutorial/query-arrays/
 */
router.post('/', async (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(403).json({
      message: 'Body should not be empty',
      statusCode: 403
    });
  }

  const newProgress = new Progress(
    req.body
  );

  newProgress
    .save()
    .then(content => res.json({
      message: 'Data successfully saved',
      statusCode: 200,
      content: content
    }))
    .catch(err => console.log(err));
});

/**
 * @route UPDATE api/progresses/
 * @desc Update progress by user
 */
router.put('/:chapter_id/users/:user_id', async (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(403).json({
      message: 'Body should not be empty',
      statusCode: 403
    });
  }

  Chapter.findById(req.params.chapter_id, function(err, chapter) {
    if (err) {
      return res.status(404).json({
        message: 'Could not find the chapter data',
        statusCode: 404
      });
    }

    Progress.findOne({user_id: req.params.user_id}, function(err, response) {
      if (err) {
        return res.status(404).json({
          message: 'Could not find the user progress data',
          statusCode: 404
        });
      }

      if (req.body.viewed <= response.progresses[chapter['title']].viewed) {
        return res.status(200).json("SUCCESS")
      }
      response.progresses[chapter['title']].viewed = req.body.viewed
      let new_progress = new Progress({user_id: req.params.user_id, progresses: response.progresses})

      new_progress.save().then(response.remove())
      res.status(200).json(new_progress)
    })
  })
});

module.exports = router;
