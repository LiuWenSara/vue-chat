var User = require('../model/user')
var Message = require('../model/message')
var util = require('util')
module.exports = function (app) {
  app.use(function (req, res, next) {
    var _user = req.session.user

    app.locals.user = _user

    next()
  })
  app.post('/user/register', function (req, res) {
    var _user = req.body
    console.log(_user)
    User.findOne({name: _user.name}, function (err, user) {
      if (err) {
        console.log(err)
      }
      if (user) {
        res.json({
          errno: 1,
          data: '用户名已存在'
        })
      } else {
        var user = new User(_user)
        user.save(function (err, user) {
          if (err) {
            console.log(err)
          }
          res.json({
            errno: 0,
            data: '注册成功'
          })
        })
      }
    })
  }),
    // 登录
    app.post('/user/login', function (req, res) {
      console.log(req.body)
      var _user = req.body
      var name = _user.name
      var password = _user.password
      console.log(password)
      User.findOne({name: name}, function (err, user) {
        if (err) {
          console.log(err);
        }
        console.log(user)
        if (!user) {
          res.json({
            errno: 1,
            data: '用户不存在'
          })
        } else {
          if (!!password) {
            user.isRight(password, function (err, isMatch) {
              if (err) {
                console.log(err);
              }
              if (isMatch) {
                req.session.user = user;
                console.log('success');
                res.json({
                  errno: 0,
                  data: '登录成功',
                  name: name,
                  imgsrc: user.imgsrc
                })
              } else {
                res.json({
                  errno: 1,
                  data: '密码不正确'
                })
                console.log('password is not meached');
              }
            })
          } else {
            res.json({
              errno: 1,
              data: '登录失败'
            })
          }
        }

      })
    }),

    // 信息
    app.get('/message', function (req, res) {
      var id = req.query.roomid
      // console.log(id)
      Message.find({roomid: id}, function (err, message) {
        if (err) {
          console.log(err)
        } else {
          // console.log(message)
          res.json({
            errno: 0,
            data: message
          })
        }
      })
    })
}
