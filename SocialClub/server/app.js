const path = require('path');
const express = require('express');
//const bodyParser = require('body-parser');

const { Repos } = require('./router');

const CLIENT_PATH = path.resolve(__dirname, '../index.html');
const app = express();

app.use(express.static(CLIENT_PATH));
//app.use(bodyParser());
//app.use(bodyParser.urlencoded());

//app.use(bodyParser.json());
app.use('/', Repos);

module.exports = {
  app,
};