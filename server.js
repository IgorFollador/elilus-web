const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/userRouter');
require('./database');

require('dotenv').config();
let port = process.env.PORT;

app.use('/', express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.listen(port, ()=>{
    console.log("Server running on port %s", port);
});
