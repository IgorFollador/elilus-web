require('./database');
//const force = require('express-force-domain');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const ProductController = require('./controllers/ProductController')

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');

require('dotenv').config();
let port = process.env.PORT;
app.set('view engine', 'ejs');

//app.use( force('https://elilusesquadrias.com.br') );

// app.use("*",(req,res,next)=>{
//     if(req.headers['x-forwarded-proto'] == "https") next();
//     else res.redirect("https://" + req.headers.host + req.originalUrl);
// });

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.use('/auth', authRouter);

app.use('/admin', adminRouter);

app.get('/search', express.json(), ProductController.searchAll)

app.listen(port, ()=>{
    console.log("Server running on port %s", port);
});

