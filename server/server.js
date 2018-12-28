// 处理css
import csshook from 'css-modules-require-hook/preset';
// 处理图片
import assethook from 'asset-require-hook';
assethook({
  extensions: ['png', 'jpg']
});
const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const models = require('./model')
const Chat = models.getModel('chat')
const path = require('path')

import buildPath from '../build/asset-manifest.json'



// 开发环境测试 jsx
import React from 'react'
import { renderToString } from 'react-dom/server'
/* function App() {
  return (
    <h2>
      <p>server render</p>
      <p>imooc server</p>
    </h2>
  )
}
console.log(renderToString(App())); */
//<h2 data-reactroot=""><p>server render</p><p>imooc server</p></h2>

// 
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from '../src/app'
import Reducer from '../src/reducer'
import { StaticRouter } from 'react-router-dom'


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
// 中间件
app.use(function (req, res, next) {
  if (req.url.startsWith('/chat/') || req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  let context = {}
  const store = createStore(
    Reducer,
    compose(
      applyMiddleware(thunk)
    )
  )
  const markup = renderToString(
    <Provider store={store} >
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>
  );
  const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" type="text/css" href="${buildPath['static/css/1.54346002.chunk.css']}">
        <link rel="stylesheet" type="text/css" href="${buildPath['main.css']}">
        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">
          ${markup}
        </div>
        <script src="${buildPath['static/js/1.3cf0ceb8.chunk.js']}"></script>
        <script src="${buildPath['main.js']}"></script>
      </body>
    </html>
  `
  return res.send(pageHtml)
  // return res.sendFile(path.resolve('build/index.html'))
})

// 设置静态资源路径
app.use('/', express.static(path.resolve('build')))



server.listen(9093, function () {
  console.log('Node app start at port 9093')
})