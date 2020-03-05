const { Router } = require('express');
const { AUTH_TOKEN, ACCOUNT_SID, PHONE_NUMBER } = require('../../client/src/Components/googleConfig');
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

const twilioRouter = Router();

twilioRouter.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

module.exports = {
  twilioRouter,
};
