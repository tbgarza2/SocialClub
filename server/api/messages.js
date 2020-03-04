const { Router } = require('express');

const messageRouter = Router();
const { getMessages, sendMessage } = require('../db/index.js');

messageRouter.post('/:id_sender/:id_recipient', (req, res) => {
  const { id_sender, id_recipient } = req.params;
  const { message } = req.body;
  sendMessage(id_sender, id_recipient, message).then(() => {
    console.log('Message sent!');
    res.send('Message sent!');
  });
});

messageRouter.get('/:id_sender/:id_recipient', (req, res) => {
  const { id_sender, id_recipient } = req.params;
  getMessages(id_sender, id_recipient).then(messages => res.send(messages));
});

module.exports = {
  messageRouter,
};
