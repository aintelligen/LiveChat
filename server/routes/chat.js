const express = require('express')
const Router = express.Router();
const models = require('../model')
const Chat = models.getModel('chat')


Router.get('/remove',function(req,res){
  Chat.remove({},function(err,doc){
    if(!err){
      res.json({
        code:0,
        msg:'聊天记录清除'
      })
    }
  })
})



module.exports=Router