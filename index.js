// express
const express = require('express');
// express variable
const app = express();
// mongoose
const mongoose = require('mongoose');
// required for .env
require('dotenv').config()


// import fruits array from models folder
const Fruit = require('./models/fruit')
const fruits = require('./models/fruits')

// veggie tales
const Vegetable = require('./models/veggie')
const vegetables = require('./models/veggies')


// middleware -------------------------------------------
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").
createEngine());
// delete
const methodOverride = require('method-override');

app.use(express.json()) //thunderware to get json

// ----------- tells express to use middleware
app.use(express.urlencoded({extended:false}));
// ---------------- middleware?
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

// delete
app.use(methodOverride('_method'));

// ------------------------------------------- MONGOOSE
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


// index all fruits
app.get('/fruits', (req, res) => {
    // we have a model, find all instance of the model
    Fruit.find({}).then((allFruits) => {
        res.render("Index", {
            fruits: allFruits
        });
    });
    // res.render("Index", {fruits: fruits}); // like <Index fruits={fruits} in REACT
    // res.json({fruits}) // test thundercloud
    // res.send(fruits) // test thundercloud
});

// ---------------- veggie tales
app.get('/veggieTale', (req,res) => {
    res.render("VeggieTale", {vegetables: vegetables})
})

app.get('/vegetables', async(req,res) => {
    const allVeggies = await Vegetable.find({});
    res.render("VegIndex", 
    {vegetables: allVeggies})


    // res.render("VegIndex", {vegetables:vegetables})
    // Vegetable.find({}).then((allVeggies) => {
    //     res.render("VegIndex", {
    //         vegetables: allVeggies
    //     })
    // })
    
    const characters = await Vegetable.find({});

})

// const allVeggies = await Vegetable.find({});
//     res.render("VegIndex", 
//     {vegetables: allVeggies})

//  ------------------------------------post
app.post('/fruits', async (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }

    const newFruit = await Fruit.create(req.body)
    await res.send(newFruit);
    
    console.log(fruits);
    // res.redirect("/fruits")

    // fruits.push(req.body);
    // console.log(fruits);
    // res.send('data received');
    // res.json(req.body)
});

// ---------------------VEGGIE TALES
app.post('/vegetables', async(req,res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }else{
        req.body.readyToEat = false;
    }
    
    const newVeg = await Vegetable.create(req.body)
    await res.send(newVeg);

    console.log(vegetables);

    // vegetables.push(req.body);
    // console.log(vegetables);
    // res.send('veggie tales complete')
})



// ------------------------------------------------------------
//add show route - each fruit
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     res.send(fruits[req.params.indexOfFruitsArray]);
// });

app.get('/fruits/new', (req, res) => {
    res.render('New');
});

// ---------------------- (DELETE)
app.delete('/fruits/:id', async(req,res) => {
    // res.send("...deleting")
    await Fruit.findByIdAndRemove(req.params.id)
    res.redirect('/fruits')
})

// ----------------------- (PUT)
app.put('/fruits/:id', async(req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/fruits/${req.params.id}`);
    });

// ---------------------- (EDIT)
app.get('/fruits/:id/edit', async(req, res)=>{
    const foundFruit = await Fruit.findById(req.params.id)
    res.render('Edit', {
        fruit: foundFruit
    })
    // Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
    //   if(!err){
    //     res.render(
    // 		  'Edit',
    // 		{
    // 			fruit: foundFruit //pass in the found fruit so we can prefill the form
    // 		}
    // 	);
    // } else {
    //   res.send({ msg: err.message })
    // }
    // });
});

app.get('/fruits/:id', async(req, res) => {
    const eachFruit = await Fruit.findById(req.params.id)
    await res.render("Show",
    {fruit: eachFruit}
    )
});

// ------------------------ VEGGIE TALES
app.get('/vegetables/new', (req,res) => {
    res.render('VegNew')
})

app.get('/vegetables/:id', async(req,res) => {
    const eachVeg = await Vegetable.findById(req.params.id)
    await res.render("VegShow", 
    {veggies:eachVeg})
})

// -------------------------- veggie tales
app.get('vegTale/new', (req,res) => {
    res.render('VegTaleNew')
})

// server
app.listen('3000', (req,res) => {
    console.log('Server is now listening on port 3000')
})