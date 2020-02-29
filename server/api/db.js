const { Router } = require('express');
const dbRouter = Router();
const { saveEvent } =require('../db/index.js')


dbRouter.post('/events', (req,res) =>{
    console.log(req)
saveEvent(req.body)
})

dbRouter.get('/events', (req,res) => {

})

dbRouter.get('/users', (req,res) =>{

});

dbRouter.post('/users', (req,res) =>{

});

module.exports = {
    dbRouter
}