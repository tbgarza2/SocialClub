const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
const { chatkitRouter } = require('./api/chatkit');
const { eventRouter } = require('./api/events');
const { messageRouter } = require('./api/messages');
const { rsvpRouter } = require('./api/rsvp');
const { userRouter } = require('./api/users');

const app = express();

const PORT = process.env.PORT || 8080;
const CLIENT_PATH = path.join(__dirname, '../client/dist');

app.use(express.static(CLIENT_PATH));
app.use(bodyParser.json());
app.use('/api/chatkit', chatkitRouter);
app.use('/api/event', eventRouter);
app.use('/api/message', messageRouter);
app.use('/api/rsvp', rsvpRouter);
app.use('/api/user', userRouter);

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:c505ed27-4164-40ae-93c1-3c5e0f669521',
  key: '42ade2ac-932c-4653-9ce2-d0807ef066ef:rQ7Fb9xKgW/sQDI2OypBm5HdpPdAGDsFij8mQTcPMvk=',
})


app.listen(PORT, () => {
  console.log(`Listening on :${PORT} 🚀`);
});

module.exports = {
  app,
};