import express from "express";
import config from "config/index.js";
import User from "model/user.js";
import Message from "/model/message.js";
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
app.use(function (req ,res , next) {
  const _user = req.session.user;
  app.locals.user = _user;
  next();
});

const env = process.env.NODE_ENV || 'development';
if ('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true)
}

const server = app.listen(port);

const io = require("socket.io")(server);
global.users = {};

io.on("connection",function (socket) {
  socket.on("message",function (obj) {
    const msg = {
      name: obj.name,
      text: obj.text,
      roomid: obj.roomid,
      imgSrc: obj.imgSrc,
    };
    io.to(obj.roomid).emit('message', msg);
    console.log(obj.name + '发布' + obj.text);
    const message = new Message(msg);
    message.save(function (err, msg) {
      if (err) {
        console.log(err);
      }
      console.log(msg);
    });
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
    io.to(obj.roomid).emit('logout', global.users[obj.roomid]);
    console.log(obj.name + '退出' + obj.roomid);
  });
  socket.on("disconnect",function () {
    if (global.users[socket.roomid]) {
      delete global.users[socket.roomid][socket.name];
      io.to(socket.roomid).emit('login', global.users[socket.roomid]);
      console.log(socket.name + '退出' + socket.roomid);
    }
  });
  app.post('/user/register',function (req ,res) {
    const _user = req.body;
    User.findOne({name: _user.name} ,function (err, user) {
      if (err) {
        console.log(err);
      }
      if (user) {
        res.json({
          errno: 1,
          data: '用户已存在'
        });
      } else {
        const user = new User(_user);
        user.save(function (err ,user) {
          if (err) {
            console.log(err);
          }
          req.session.name = _user.name;
          res.json({
            errno: 0,
            data: '注册成功',
            imgSrc: user.imgSrc,
            name: _name
          })
        })
      }
    });
  });
  app.post('/user/login',function (req ,res) {
    const _user = req.body;
    const _name = _user.name;
    const _password = _user.password;
    User.findOne({name: _name} ,function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        res.json({
          errno: 1,
          data: '用户不存在'
        });
      } else {
        if (_password) {
          const user = new User(_user);
          user.isRight(_password ,function (err , isMatch) {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              req.session.name = _name;
              res.json({
                errno: 0,
                data: '登录成功',
                imgSrc: user.imgSrc,
                name: _name
              });
            } else {
              res.json({
                errno: 1,
                data: '密码不正确'
              });
            }
          });
        } else {
          res.json({
            errno: 1,
            data: '登录失败'
          });
        }
      }
    });
  });
  app.post('/message',function (req ,res) {
    const _roomid = req.query.roomid;
    Message.find({roomid: _roomid} ,function(err ,message) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          errno: 0,
          data: message
        });
      }
    })
  });
});


