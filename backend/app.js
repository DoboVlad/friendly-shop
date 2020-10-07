const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./models/products');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
const productsRouter = require('./routers/products');
const cors = require('cors')
const path = require('path');

//10qVbLJhRZFaoPHi
const app = express();

mongoose.connect('mongodb+srv://Vlad:' + process.env.mongo_password + '@shop.f7lx6.mongodb.net/shop-db?retryWrites=true&w=majority').then(()=> {
    console.log('Connected to database');
})

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));
app.use(userRouter);
app.use(productsRouter);
app.use('/images', express.static(path.join('images')));
app.use('/', express.static(path.join(__dirname, 'angular')));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
