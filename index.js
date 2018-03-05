'use strict'

/**
 * Librerias
 * Mongoose
 */
var mongoose = require("mongoose");
var cron = require('node-cron');
var PreciosContoller = require('./src/controladores/PreciosController');

/**
 * Modulo de Express
 */

var app = require('./app');
var port = process.env.PORT || 7080;



/*=============================================
Conectar a la base de datos
=============================================*/
mongoose.connect("mongodb://ymendez:ymendez15@ds229648.mlab.com:29648/femtesa", (error, respuesta) => {
    if (error) {
        throw  error;
    } else {
        console.log("La conexion a la BD esta correcta");
        app.listen(port, function () {
            console.log("Servidor del api Rest en http://localhost:" + port);
        });
    }
});


cron.schedule('0 20 11 */1 * *', function(){
    PreciosContoller.buscarPrecioPorMes();
    console.log('Se ejecuto el servicio');
});