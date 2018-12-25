const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const models = require('./model')
const Chat = models.getModel('chat')
const User = models.getModel('user')

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    console.log(data);
    const { from, to, msg } = data;
    const chat_id = [from, to].sort().join('_');
    Chat.create({ chat_id, from, to, content: msg }, function (err, doc) {
      if (!err) {
        io.emit('recvmsg', Object.assign({}, doc._doc))
      }
    })
  })
})


const userRouter = require('./routes/user')
const chatRouter = require('./routes/chat')

app.use(cors({
  allowedOrigins: [
    'localhost',
    '127.0.0.1'
  ]
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/user', userRouter)
app.use('/chat', chatRouter)





server.listen(9093, function () {
  console.log('Node app start at port 9093')
})