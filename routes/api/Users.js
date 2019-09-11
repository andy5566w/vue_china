// @logoin & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var gravatar = require('gravatar');
const secret = require('../../config/keys')
const passport = require('passport');

const User = require('../../models/Users');

// $route GET api/users/test
// @desc 返回請求的json數據
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: 'login works!'
    })
})

// $route POST api/users/register
// @desc 返回請求的json數據
// @access public
router.post('/register', (req, res) => {
    console.log('post body',req.body)

    // 查詢是否此email已被註冊
    User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({msg:'email已被註冊'})
            } else {
                // mm返回一個頭像
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    identity:req.body.identity,
                    password:req.body.password
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash)=> {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }

        })
})

// $route POST api/users/register
// @desc 返回token jwt
// @access public
router.post('/login', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email
    })
    .then(user => {
        // 查詢email是否存在
        if(!user) res.status(400).json({msg:'用戶不存在'})

        // 解碼密碼是否正確
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    const rule = {
                        id:user.id,
                        email:user.email,
                        identity:user.identity,
                        avatar:user.avatar,
                        name:user.name
                    }
                    // 放入的參數：1.規則 2.加密名稱 3.過期時間 4.箭頭函數
                    jwt.sign(rule,secret.secretOfKey,{expiresIn:3600},(err, token) =>{
                        if(err) throw err;
                        res.json({
                            success:true,
                            token:`Bearer ${token}`
                        })
                    })
                }else {
                    res.json({msg:'password is not correct'})
                }
            })
            .catch(err => console.log(err))
    })
})

// $route GET api/users/cerrent
// @desc 返回token jwt
// @access private
router.get('/current',passport.authenticate('jwt',{session:false}), (req, res) => {
    res.json({
        email: req.user.email,
        name:req.user.name,
        id:req.user.id,
        identity:req.user.identity
    })
})

module.exports = router;