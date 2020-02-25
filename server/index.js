const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
const { chatkitRouter } = require('./api/chatkit');

const app = express();

const PORT = process.env.PORT || 8080;
const CLIENT_PATH = path.join(__dirname, '../client/dist');

app.use(express.static(CLIENT_PATH));
app.use(bodyParser.json());
app.use('/api/chatkit', chatkitRouter);

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