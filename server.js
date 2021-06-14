require('./database');
const express = require('express');
const app = express();
const path = require('path');

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');

require('dotenv').config();
let port = process.env.PORT;

app.use("*",(req,res,next)=>{
    if(req.headers['x-forwarded-proto'] == "https") next();
    else res.redirect("https://" + req.headers.host + req.originalUrl);
});

app.use('/', express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.use('/auth', authRouter);

app.use('/admin', adminRouter);

app.listen(port, ()=>{
    console.log("Server running on port %s", port);
});

