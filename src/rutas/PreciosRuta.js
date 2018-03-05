'use strict'

var express = require('express');
var preciosController = require('../controladores/PreciosController');

var api = express.Router();


api.get('/preciosGasolina', preciosController.savePreciosAPI);

api.get('/obtenerPreciosGasolina', preciosController.sendPrecios);


module.exports = api;