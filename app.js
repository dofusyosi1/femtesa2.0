'use strict'

/**
 * Librerias
 * Express
 * BodyParser
 * */
var express = require('express');
var bodyParser = require('body-parser');

var box = require('./boxApi');


/*=============================================
Motor de las aplicaciones para poder recibir
las peticiones http.
=============================================*/

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*----------  Configuracion de Cabeceras HTTP  ----------*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "* ");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Request-Methods", "GET, POST, PUT, DELETE");
    res.header("Allow", "GET, POST, PUT, DELETE");
    next();
});


/**** Cargar Rutas (API) *****/

var rutaPrecios = require('./src/rutas/PreciosRuta');


app.get("/pruebas", function(request, response){

//200 OK
//404 No Found
//500 Error Interno

response.status(200).send({mensaje: 'Bienvenido'});

});


app.use('/api/', rutaPrecios);




module.exports = app;