// 处理css
import csshook from 'css-modules-require-hook/preset';
// 处理图片
import assethook from 'asset-require-hook';
assethook({
  extensions: ['png', 'jpg', 'ico']
});
const path = require('path');
const express = require('express');
const fs = require('fs');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var optionsSsl = {
  key: fs.readFileSync(path.resolve(__dirname, './ssl/2_react.aintelligen.com.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './ssl/1_react.aintelligen.com_bundle.crt'))
};

const server = require('https').createServer(optionsSsl, app);
const io = require('socket.io')(server);
const models = require('./model');
const Chat = models.getModel('chat');

var iconv = require('iconv-lite');
var buildHtml = fs.readFileSync(path.resolve(__dirname, '../build/index.html'));
var myHtml2 = iconv.decode(buildHtml, 'utf-8');

// 开发环境测试 jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from '../src/app';
import Reducer from '../src/reducer';
import { StaticRouter } from 'react-router-dom';
console.log('reset');
io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    console.log(data);
    const { from, to, msg } = data;
    const chat_id = [from, to].sort().join('_');
    Chat.create({ chat_id, from, to, content: msg }, function(err, doc) {
      if (!err) {
        io.emit('recvmsg', Object.assign({}, doc._doc));
      }
    });
  });
});

const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');

app.use(
  cors({
    allowedOrigins: ['localhost', '127.0.0.1']
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/chat', chatRouter);
// 中间件
app.use(function(req, res, next) {
  if (req.url.startsWith('/chat/') || req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next();
  }
  if (req.url.startsWith('/favicon.png')) {
    res.type('png');
    return res.sendFile(path.resolve(__dirname, '../build/favicon.png'));
  }
  if (req.url.startsWith('/manifest.json')) {
    res.type('json');
    return res.sendFile(path.resolve(__dirname, '../build/manifest.json'));
  }

  let context = {};
  const store = createStore(Reducer, compose(applyMiddleware(thunk)));
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // 替换 <div id="root"></div>   <div id="root">markup</div>
  const pageHtmlFile = myHtml2.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

  return res.send(pageHtmlFile);
});

// 设置静态资源路径
app.use('/', express.static(path.resolve('build')));

server.listen(9093, function() {
  console.log('Node app start at port 9093');
});
