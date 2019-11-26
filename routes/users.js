const express = require('express');
const {
  isEmpty
} = require('lodash');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const passport = require("passport");
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    return res.json({
      users
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error'
    });
  }
});

/**
 * @route POST api/users/
 * @desc Create an account
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
    prefix,
    email,
    password,
    nickname,
    staffID,
    branches,
    permission,
    phone
  } = req.body;
  const newUser = new User({
    prefix,
    email,
    password,
    nickname,
    staffID,
    branches,
    permission,
    phone,
    grade: 0,
    date: Date.now()
  });

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      // Hash password before saving in database
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({
              message: 'Data successfully saved',
              statusCode: 200,
              user: users
            }))
            .catch(err => console.log(err));
        });
    }
  });
});

/**
 * @route POST api/users/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post('/login', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        emailnotfound: "Email not found"
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrkey, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({
            passwordincorrect: "Password incorrect"
          });
      }
    });
  });
});

module.exports = router;
