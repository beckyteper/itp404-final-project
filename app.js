require('dotenv').config();
var express = require('express')
var app = express()
var Sequelize = require('sequelize');
var request = require('request');
var newyorktimes = require('./api/newyorktimes');
var cors = require('cors');
var bodyParser = require('body-parser');
var cnn = require('./api/cnn');
var wallstreetjournal = require('./api/wallstreetjournal');

app.use(cors());
app.use(bodyParser());

app.get('/nytimes/:q', function (req, res) {
  newyorktimes.listArticles(req.params.q).then(function(articles) {
    res.json(articles);
  });
})

app.get('/cnn/:q', function(req, res) {
  cnn.listArticles(req.params.q).then(function(articles) {
    res.json(articles);
  });
})

app.get('/wallstreetjournal/:q', function(req, res) {
  wallstreetjournal.listArticles(req.params.q).then(function(articles) {
    res.json(articles);
  });
})
 
app.listen(3000)
