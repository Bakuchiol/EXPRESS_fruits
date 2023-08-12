const mongoose = require('mongoose');

const VegSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    color:  { type: String, required: true },
    readyToEat: Boolean
});

const Vegetable = mongoose.model('Vegetable', VegSchema);

module.exports = Vegetable;