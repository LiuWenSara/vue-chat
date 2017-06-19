import express from "express";
import config from "config/index.js";
const port = process.env.PORT || config.dev.port;

const app = express();

const router = express.Router();
// 用于静态展示入口
router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});

app.use(router);

import mongoose from "mongoose";
//node.js的HTTP请求记录器中间件
import morgan from "morgan";
//session 储存
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
// 用于异步回调
mongoose.Promise = require('bluebird');
global.db = mongoose.connect("mongodb://localhost:27017/chat");

// 服务器提交的数据json化因为ajax提交的数据无法被express正确的解析
app.use(bodyParser.json());//bodyParser.json是用来解析json数据格式的。
app.use(bodyParser.urlencoded({extended: true}));//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
// sesstion 存储
app.use(cookieParser());
app.use(session({
  secret: 'vuechat',
  resave: false,
  saveUninitialized: true
}));

const env = process.env.NODE_ENV || 'development';
if ('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true)
}

const server = app.listen(port);

const io = require("socket.io")(server);
import Message from "/model/message.js";
global.users = {};

io.on("connection",function (socket) {
  socket.on("message",function (obj) {
    const msg = {
      name: obj.name,
      text: obj.text,
      roomid: obj.roomid,
      src: obj.roomid,
      img: obj.img
    };
    io.to(obj.roomid).emit('message', msg);
    console.log(obj.name + '发布' + obj.text);
    if (obj.img === ''){
      const message = new Message(mess);
      message.save(function (err, mess) {
        if (err) {
          console.log(err);
        }
        console.log(mess);
      })
    }
  });
  socket.on("login",function (obj) {
    socket.name = obj.name;
    socket.room = obj.roomid;
    if(!global.users[obj.roomid]){
      global.users[obj.roomid] = {};
    }
    global.users[obj.roomid][obj.name] = obj;
    socket.join(obj.roomid);
    io.to(obj.roomid).emit('login', global.users[obj.roomid]);
    console.log(obj.name + '加入' + obj.roomid);
  });
  socket.on("logout",function (obj) {
    delete global.users[obj.roomid][obj.name];
    io.to(obj.roomid).emit('login', global.users[obj.roomid]);
    console.log(obj.name + '退出' + obj.roomid);
  });
  socket.on("disconnect",function () {
    if (global.users[socket.roomid]) {
      delete global.users[socket.roomid][socket.name];
      io.to(socket.roomid).emit('login', global.users[socket.roomid]);
      console.log(socket.name + '退出' + socket.roomid);
    }
  });
});

