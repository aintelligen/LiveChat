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

import buildPath from '../build/asset-manifest.json';



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
  // 获取chunk.[hash:8].css  和 chunk.[hash:8].js
  let chunkArr = Object.keys(buildPath);
  let chunkJs, chunkCss;
  chunkArr.forEach(v => {
    if (String(v).match(/(chunk.){1}(.{8}).js$/gi)) {
      chunkJs = buildPath[v];
    } else if (String(v).match(/(chunk.){1}(.{8}).css$/gi)) {
      chunkCss = buildPath[v];
    }
  });
  const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" type="text/css" href="${chunkCss}">
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
        <script>!function (l) { function e(e) { for (var r, t, n = e[0], o = e[1], u = e[2], f = 0, i = []; f < n.length; f++)t = n[f], p[t] && i.push(p[t][0]), p[t] = 0; for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (l[r] = o[r]); for (s && s(e); i.length;)i.shift()(); return c.push.apply(c, u || []), a() } function a() { for (var e, r = 0; r < c.length; r++) { for (var t = c[r], n = !0, o = 1; o < t.length; o++) { var u = t[o]; 0 !== p[u] && (n = !1) } n && (c.splice(r--, 1), e = f(f.s = t[0])) } return e } var t = {}, p = { 2: 0 }, c = []; function f(e) { if (t[e]) return t[e].exports; var r = t[e] = { i: e, l: !1, exports: {} }; return l[e].call(r.exports, r, r.exports, f), r.l = !0, r.exports } f.m = l, f.c = t, f.d = function (e, r, t) { f.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, f.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, f.t = function (r, e) { if (1 & e && (r = f(r)), 8 & e) return r; if (4 & e && "object" == typeof r && r && r.__esModule) return r; var t = Object.create(null); if (f.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: r }), 2 & e && "string" != typeof r) for (var n in r) f.d(t, n, function (e) { return r[e] }.bind(null, n)); return t }, f.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return f.d(r, "a", r), r }, f.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, f.p = "/"; var r = window.webpackJsonp = window.webpackJsonp || [], n = r.push.bind(r); r.push = e, r = r.slice(); for (var o = 0; o < r.length; o++)e(r[o]); var s = n; a() }([])</script>
        <script src="${chunkJs}"></script>
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