const express = require('express');
// const { apiRouter } = require('./api');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../react-client/dist`));
// app.use('/api', apiRouter);

module.exports = {
    app,
};
