

function messagesRouter(io){
    
    const express = require('express');
    const router = express.Router()
    const db = require('../models/messages-model')
    

    router.get('/', require('../middleware/verifyUsersAuth')(), async (req, res, next)=>{
        try{
            const messages = await db.getAll();
            return res.json(messages)
    
        } catch(err){
            next(err)
        }
    })
    
    router.post('/', require('../middleware/verifyUsersAuth')(), async (req, res, next)=>{
        try{
            const newMessage = await db.addMessage({...req.body, uid: req.user.uid})
            io.emit('chat message', {
                ...newMessage,
                name: req.user.name
            })
            res.json(newMessage)
        } catch(err){
            next(err)
        }
    })

    return router;
}    



module.exports = messagesRouter;