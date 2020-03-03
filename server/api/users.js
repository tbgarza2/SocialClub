const { Router } = require('express');
const userRouter = Router();
const {
  addUser,
  selectUser,
} = require('../db/index.js')

userRouter.get('/users/:email', (req, res) => {
  selectUser(req.params.email, res)
    .then(data => res.send(data))
});

userRouter.post('/users', (req, res) => {
  addUser(req.body)
});

module.exports = {
  userRouter
}