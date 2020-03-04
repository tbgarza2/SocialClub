const { Router } = require('express');
const client = require('twilio')(
  'AC05a7c6f3a12f05533d792ffd9c3e1579',
  'c3d4dfee7ed3e9d7afdfad087de3ac8d',
);

const twilioRouter = Router();

twilioRouter.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: '+12052935884',
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
