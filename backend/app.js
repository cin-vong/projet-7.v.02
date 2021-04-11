const express = require('express');
const connection = require('./dbParams');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Connexion DB

connection.connect(function(err){
  if (err){
    console.log("Erreur de connection à la BDD " + err)
  }
  else {
      console.log("Connection BDD Groupomania réussie")
  }
});

//Middleware

app.use(bodyParser.json());
app.use(cors())

//Routes API
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;