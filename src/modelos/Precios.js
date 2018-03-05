'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var preciosSchema = schema({
    magna: String,
    premium: String,
    diesel: String,
    mes: String
});

module.exports = mongoose.model('Precios', preciosSchema);