const express = require('express');
const router = express.Router();
const db = require('../models/user-model');


router.get('/', require('../middleware/verifyUsersAuth')() , async (req, res, next)=>{
    try{
        res.json(await req.user)
    } catch(err){
        next(err)
    }
})



module.exports = router;