'use strict'

var mongoose = require("mongoose");
var cron = require('node-cron');
var PreciosContoller = require('./src/controladores/PreciosController');

var app = require('./app');
var http = require('http');

var port = 7070 | process.env.PORT;
app.set('port', port);


var server = http.createServer(app);


mongoose.connect("mongodb://ymendez:ymendez15@ds229648.mlab.com:29648/femtesa", (error, respuesta) => {
    if (error) {
        throw  error;
    } else {
        console.log("La conexion a la BD esta correcta");
        server.listen(port, function () {
            console.log("Servidor del api Rest " + port);
        });
    }
});


cron.schedule('0 0 0 */1 * *', function(){
    console.log(new Date());
    PreciosContoller.buscarPrecioPorMes();
    console.log('Se ejecuto el servicio');
});
