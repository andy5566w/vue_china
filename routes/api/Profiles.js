// @logoin & register
const express = require('express');
const router = express.Router();

const passport = require('passport');
const Profiles = require('../../models/Profiles');

// $route GET api/profiles/test
// @desc 返回請求的json數據
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: 'profiles works!'
    })
})

// $route POST api/profiles/add
// @desc 建立訊息接口
// @access private
router.post('/add',passport.authenticate('jwt',{session:false}), (req, res) => {
    const profiles = {};
    if(req.body.type) profiles.type = req.body.type
    if(req.body.describe) profiles.describe = req.body.describe
    if(req.body.income) profiles.income = req.body.income
    if(req.body.expend) profiles.expend = req.body.expend
    if(req.body.cash) profiles.cash = req.body.cash
    if(req.body.remark) profiles.remark = req.body.remark

    new Profiles(profiles).save()
        .then(profile => res.json(profile))
        .catch(err => console.log(err))
})

// $route GET api/profiles/profiles
// @desc 獲得全部訊息
// @access private
router.get('/profiles',passport.authenticate('jwt',{session:false}),(req, res) => {
    // 全查
    Profiles.find()
        .then(profiles =>{
            if(!profiles){
                res.status(404).json(`no data`)
            } else {
                res.json(profiles);
            }
        })
        .catch(err => res.status(400).json(err))
})

// $route GET api/profiles/profiles/:id
// @desc 用id獲取訊息
// @access private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req, res) => {
    Profiles.find({'_id':req.params.id})
        .then(profiles =>{
            if(!profiles){
                res.status(404).json(`no data`)
            } else {
                res.json(profiles);
            }
        })
        .catch(err => res.status(400).json(err))
})

// $route POST api/profiles/edit/:id
// @desc 編輯資訊
// @access private
router.post('/edit/:id',passport.authenticate('jwt',{session:false}), (req, res) => {
    const profiles = {};
    if(req.body.type) profiles.type = req.body.type
    if(req.body.describe) profiles.describe = req.body.describe
    if(req.body.income) profiles.income = req.body.income
    if(req.body.expend) profiles.expend = req.body.expend
    if(req.body.cash) profiles.cash = req.body.cash
    if(req.body.remark) profiles.remark = req.body.remark

    Profiles.findOneAndUpdate(
        {'_id':req.params.id},
        {'$set':profiles},
        {new:true}
    )
    .then(profile => {
        if(profile) res.json(profile)
    })
    .catch(err => res.status(400).json(err))
})

// $route POST api/profiles/delete/:id
// @desc 刪除資訊
// @access private
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req, res) => {
    Profiles.findOneAndRemove({'_id':req.params.id})
        .then(profiles =>{
            if(!profiles){
                res.status(404).json(`no data`)
            } else {
                res.json(profiles);
            }
        })
        .catch(err => res.status(400).json(err))
})

module.exports = router;