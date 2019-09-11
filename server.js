const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const passport = require('passport');

// 引入users.js, profiles.js
const users = require('./routes/api/Users')
const profiles = require('./routes/api/Profiles')

//DB config
const db = require('./config/keys')

// connect to mongoDB
mongoose.connect(db.mongoURL,{ useNewUrlParser: true })
.then(() => console.log(`mongo DB is connected`))
.catch(err => console.log(err))

// 使用body-parser的物件，要在routes前面
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 初始化passport
app.use(passport.initialize());
require('./config/passport')(passport);

// 使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`this server is listening, port is ${port}.`)
})