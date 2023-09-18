//CREATING A SERVER
var express = require('express');
var server = express();
var mongoose = require('mongoose');
var Product = require('./models/product');


server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//CONNECTION WITH MONGODB

mongoose.connect('mongodb+srv://Farahsaeed:aB8GxteGfsDoPOAr@cluster0.y6lv8ja.mongodb.net/ProductsDB')
    .then(() => {
        console.log("CONNECTED TO DB");
    })
    .catch((err) => {
        console.log("ERROR IN CONNECTION");
    })

//GET ALL PRODUCTS
server.get('/products', function (req, res) {
    Product.find().then((productsData) => {
        res.send(productsData)
    }).catch((err) => {
        res.send({
            error: "Error getting products"
        })
    })
})

//GET PRODUCT BY ID
server.get('/product/:id', function (req, res) {
    //=+ --> to change from string to number
    let productId = + req.params.id;
    Product.findOne({ id: productId }).then((product) => {
        res.send(product)
    }).catch((err) => {
        console.log(err);
    })
})

//MAKE BOLD FONT
const boldText = (text) => {
    const boldCode = "\u001b[1m";
    const resetCode = "\u001b[0m";
    const boldText = boldCode + text + resetCode;
    return boldText
};

//WELCOM MSG
server.get('/' , function(req , res){
    res.redirect('/home')
})

// server.get(['/home','/'], function (req, res) {
//     let bold = boldText("Welcome to our APIs");
//     console.log(bold);
//     // res.send(bold);
//     // console.log('<b>Welcome to our APIs</b>');
// })

server.get('/home', function (req, res) {
    let bold = boldText("Welcome to our APIs");
    console.log(bold);
    //res.send(bold);
    // console.log('<b>Welcome to our APIs</b>');
})

//NOT FOUND (ENDPOINT)
server.get('**', function (req, res) {
    res.status(404).send("404 Not Found")
})

server.listen(4000, () => {
    console.log("sever Connected");
})