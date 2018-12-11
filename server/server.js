const express = require('express')
const mongoose = require('mongoose')
const cors = require("express-cors")
const app = express();


app.use(cors())

// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-react';
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log("mongo connect success")
})
// mogoose model
const User = mongoose.model('user', new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
}))

/* User.create({
  user: 'kobe',
  age: 19
}, function (err, doc) {
  if (!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
})
User.create({
  user: 'james',
  age: 18
}, function (err, doc) {
  if (!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
})
User.remove({ age: 18 }, function (err, doc) {
  if (!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
}) */

User.update({ 'user': 'kobe' }, { '$set': { 'age': 38 } }, function (err, doc) {
  if (!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
})


app.get('/user', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})



app.get('/', function (req, res) {
  res.send('<h1>hello Express!!</h1>')
})




app.listen(9093, function () {
  console.log('Node app start at port 9093')
})