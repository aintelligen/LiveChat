const express = require('express')
const utils = require('utility')
const Router = express.Router();
const models = require('../model')
const User = models.getModel('user')
const Chat = models.getModel('chat')

const _filter = {'pwd':0, '__v':0}


Router.post('/update', function (req, res) {
  const userid = req.cookies ? req.cookies.userid : '';
  if(!userid){
    return res.json({code:1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid,body,function(e,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    if (!doc) {
      return res.json({
        code: 1,
        msg: '更新失败'
      })
    }
    return res.json({
      code: 0,
      data:data
    })
  })

})
Router.post('/login', function (req, res) {  

  const { user, pwd} = req.body;
  User.findOne({ user: user, pwd:md5Pwd(pwd) }, _filter,function (err, doc) {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '用户名或者密码错误'
      })
    }    
    res.cookie('userid', doc._id);
    return res.json({
      code: 0,
      data:doc
    })
  })

})

Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body;
  User.findOne({ user: user }, function (err, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: '用户名重复'
      })
    }
    const userModel = new User({ user, pwd:md5Pwd(pwd), type })
    userModel.save(function(err,doc){
      if(err){
        return res.json({
          code: 1,
          msg: '后端出错了'
        })
      }
      const { user, type, _id } = doc;
      res.cookie('userid',_id);
      return res.json({
        code: 0,
        data:{user, type, _id}
      })
    })
  })
});


Router.get('/info', function (req, res) {
  const {userid} = req.cookies;
  if(!userid){
    return res.json({
      code:1
    })
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    const {userid} = req.cookies;
    if(err){
      res.json({ code: 1, msg:'后端出错了' })
    }
    if(doc){
      res.json({ code: 0, data:doc })
    }
    
  })
})

Router.post('/readmsg', function (req, res) {
  const {userid} = req.cookies;
  const {from} = req.body;  
  if(!userid){
    return res.json({
      code:1,
      msg:'账号未登录'
    })
  }
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    {'multi':true},
    function(err,doc){
      if(err){
        return res.json({ code: 1, msg:'后端出错了' })
      }
      return res.json({ code: 0, num:doc.nModified })
    }
  )
  
})

Router.get('/getmsglist', function (req, res) {
  const {userid} = req.cookies;
  if(!userid){
    return res.json({
      code:1
    })
  }
  User.find({},function(err,userDoc){
    let users = {}
    userDoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    const findFilter = {'$or':[{from:userid}, {to:userid}]};
    Chat.find(findFilter,function(err,doc){
      if(doc){
        res.json({ code: 0, msgs:doc, users:users })
      }    
    })
  })
  
})

Router.get('/list', function (req, res) {
  const {type} = req.query;
  User.find({type},function(err,doc){
    if(doc){
      res.json({ code: 0, data:doc })
    }    
  })
})
Router.get('/remove', function (req, res) {
  User.remove({},function(err,doc){
    if(doc){
      res.json({ code: 0, msg:'删除成功' })
    }    
  })
})

// md5
function md5Pwd(pwd){
  const salt='imooc_is_user_ifsodfij@'+pwd+'#$%^&_DFGHjTYUIFJSDFJSDOFNSVN@#$%&*'
  return utils.md5(utils.md5(salt))
}




module.exports = Router
