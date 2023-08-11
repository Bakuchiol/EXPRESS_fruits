// express
const express = require('express');
// mongoose
const mongoose = require('mongoose');
// required for .env
require('dotenv').config()

// express variable
const app = express();
// import fruits array from models folder
// const fruits = require('./models/fruits')
const Fruit = require('./models/fruit')


// middleware
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").
createEngine());

app.use(express.json()) //thunderware to get json



// ----------- tells express to use middleware
app.use(express.urlencoded({extended:false}));
// ---------------- middleware?
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

// ------------------------------------------- MONGOOSE
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


// index all fruits
app.get('/fruits/', (req, res) => {
    Fruit.find({}) // we have a model, find all instance of the model
    .then((allFruits) => {
        res.render("Index", {
            fruits: allFruits
        });
    });
    // res.render("Index", {fruits: fruits}); // like <Index fruits={fruits} in REACT
    // res.json({fruits}) // test thundercloud
    // res.send(fruits) // test thundercloud
});


//  ------------------------------------post
app.post('/fruits', async (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }

    const newFruit = await Fruit.create(req.body)
    await res.send(newFruit);
    
    // console.log(fruits);
    res.redirect("/fruits")

    // fruits.push(req.body);
    // console.log(fruits);
    // res.send('data received');
    // res.json(req.body)
});

// ------------------------------------------------------------
//add show route - each fruit
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     res.send(fruits[req.params.indexOfFruitsArray]);
// });

app.get('/fruits/new', (req, res) => {
    res.render('New');
});


app.get('/fruits/:id', async(req, res) => {
    const eachFruit = await Fruit.findById(req.params.id)
    await res.render("Show",
    {fruit: eachFruit}
    )
});


// server
app.listen('3000', (req,res) => {
    console.log('Server is now listening on port 3000')
})