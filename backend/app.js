const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./models/products');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
const productsRouter = require('./routers/products');
const cors = require('cors');
const path = require('path');

//10qVbLJhRZFaoPHi
const app = express();

// mongodb+srv://Vlad:' + process.env.mongo_password + '@shop.f7lx6.mongodb.net/shop-db?retryWrites=true&w=majority
mongoose.connect('mongodb://127.0.0.1:27017/online-shop', {useNewUrlParser: true, useUnifiedTopology: true, ssl: false, useCreateIndex: true}).then(()=> {
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

// automayically parse from JSON to JS
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: "10mb", extended: true}));

app.use(userRouter);
app.use(productsRouter);
app.use('/images', express.static(path.join('images')));
app.use('/', express.static(path.join(__dirname, 'angular')));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
