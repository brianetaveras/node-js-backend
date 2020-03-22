const express = require('express');
const router = express.Router()
const db = require('../models/messages-model')


router.get('/', require('../middleware/verifyUsersAuth')(), async (req, res, next)=>{
    try{
        const messages = await db.getAll();

        res.json(messages.rowCount)

    } catch(err){
        next(err)
    }
})

router.post('/', require('../middleware/verifyUsersAuth')(), async (req, res, next)=>{
    try{
        const newMessage = await db.addMessage({...req.body, uid: req.user.uid})
        res.json(newMessage)
    } catch(err){
        next(err)
    }
})




module.exports = router;