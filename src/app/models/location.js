const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const locationSchema = new mongoose.Schema({
        user : String,
        date : { type: Date, default: Date.now },
        latitud: String,
        longitud: String
});

module.exports = mongoose.model('Location', locationSchema);