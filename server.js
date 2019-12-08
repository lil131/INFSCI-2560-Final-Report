require('dotenv').config();
// Importing Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// importing files
const routes = require('./routes');
const users =require('./routes/users');
const chapters =require('./routes/chapters');
const comments =require('./routes/comments');
const progresses = require('./routes/progresses');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1
const dbURI = process.env.MONGODB_URI;

// Step 2 {useUnifiedTopology: true}
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true }).
catch(error => {throw error;});

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use('/api/users', users);
app.use('/api/chapters', chapters);
app.use('/api/comments', comments);
app.use('/api/progresses', progresses);
// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});
