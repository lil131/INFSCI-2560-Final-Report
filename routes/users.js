const express = require('express');
const {
  isEmpty
} = require('lodash');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Progress = require('../models/progress');
const Chapter = require('../models/chapter');
const passport = require("passport");
const router = express.Router();
require('dotenv').config();

const crypto = require("crypto");
const async = require('async');
// Configure nodemailer to send email 
const nodemailer = require("nodemailer");
var email = process.env.MAILER_EMAIL_ID || 'tina1995hsieh@gmail.com';
var pass = process.env.MAILER_PASSWORD || 'vu,4ru8 vm0 '; //laqnknqmigabuaoa

var smtpTrans = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass
  }
});

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

router.get('/:user_id', async (req, res) => {
  try {
    User.findById(req.params.user_id, function(err, userData) {
      res.json({userData})
    })
  } catch(error) {
    return res.status(500).json({
      message: 'Internal Server error'
    });
  }
})

router.get('/test', async (req, res) => {
  try {
    Chapter.find({}, function(err, chapters) {
      let init = {}
      chapters.forEach(chapter => {
        init[chapter.title] = {viewed: 0, scores: []}
      })
      return res.json(init)
    })
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
            .then(user => {
              Chapter.find({}, function(err, chapters) {
                let init = {}
                chapters.forEach(chapter => {
                  init[chapter.title] = {viewed: 0, scores: []}
                })
                let new_progress = new Progress({user_id: user._id, progresses: init})
                new_progress.save().then(() => {
                  return res.json({
                     message: 'Data successfully saved',
                     statusCode: 200
                   })
                })
              })
              })
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
              token: "Bearer " + token,
              nickname: user.nickname,
              permission: user.permission,
              user_id: user._id
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

router.get('/forgot', function(req, res) {
  res.status(200).json({
     message: 'Forgot password',
     statusCode: 200,
     user: req.query.user
   })
});

router.post('/forgot', function(req, res, next) {
  // Async waterfall helps to make sure that 
  // each of the functions are performed one after the other
  async.waterfall([
    function(done) {
      // Asynchronous
      // create the random token
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    // search the database for the user existence
    // if it exist, a token is generated and updates the user object in the database
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
        req.flash('error', 'User not found. No account with that email address exists.');
          return res.redirect('/forgot');
        }
        console.log('Completed step 1: confirmed the user email');
        
        // User.findByIdAndUpdate({ _id: user._id }, 
        //   { reset_password_token: token, reset_password_expires: Date.now() + 3600000 }, 
        //   { upsert: true, new: true }).exec(function(err, new_user) {
        //     done(err, token, new_user);
        //   });
        user.reset_password_token = token;
        user.reset_password_expires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      console.log('completed step 2: reset password token');

      // email template
      var data = {
        from: 'sender@email.com', //email,
        to: 'chh171@pitt.edu', //user.email,
        subject: 'Password Reset',
        text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          //'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'http://localhost:3000/api/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      smtpTrans.sendMail(data, function(err, info) {
        if(!err){
          console.log('Completed step 3: send the password reset email');
          res.json(info);
          //return res.redirect('/forgot');
        } else {
          console.log(err);
          return done(err);
        }
      });
    }
  ], function(err) {
    console.log('this err' + ' ' + err)
    res.status(422).json({ 
      message: err 
    });
  });
});

/*router.get('/reset/:token', function(req, res) {
  // Check if the token exists in the database and has not expired.
  User.findOne({
    reset_password_token: req.params.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }, function(err, user) {
    console.log(user);
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.status(200).json({
    message: 'Reset password',
    statusCode: 200,
    token: req.params.token
  })
  });
});
*/
module.exports = router;
