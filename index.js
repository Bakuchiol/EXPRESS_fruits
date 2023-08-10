const express = require('express');
const app = express();

// import fruits array from models folder
const fruits = require('./models/fruits')


// middleware
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").
createEngine());

app.use(express.json()) //thunderware to get json

// ----------------------------------------------------
// fruits array - old way
// const fruits = ['apple', 'banana', 'pear'];

// // array of objects - too cluttered -moved to models folder
// const fruits = [
//     {
//         name:'apple',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];

// ----------- tells express to use middleware
app.use(express.urlencoded({extended:false}));
// ---------------- middleware?
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});



// index all fruits
app.get('/fruits/', (req, res) => {
    res.render("Index", {fruits: fruits}); // like <Index fruits={fruits} in REACT
    // res.json({fruits}) // test thundercloud
    // res.send(fruits) // test thundercloud
});


//  ------------------------------------post
app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    res.send('data received');
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


app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.render('Show', {
        fruit: fruits[req.params.indexOfFruitsArray]
    });
});


// server
app.listen('3000', (req,res) => {
    console.log('Server is now listening on port 3000')
})