'use strict'

var Precios = require('../modelos/Precios');
var fetch = require('node-fetch');
var request = require('request');

var util = require('../util/settings');

//API GOBIERNO
var BASE_URL = 'http://api-reportediario.cre.gob.mx/';

function sendPrecios(request, response) {

    Precios.find({}).sort({$natural:-1}).limit(1).exec((error, precio) => {
        if (error) {
            util.enviarMail('No se encontro el precio. URGE CHECAR EL ERROR');
            response.status(500).send({mensaje: 'Error'});
        }

        if (precio) {
            console.log(precio);
            response.status(200).send({mensaje: precio});
        }

    });
}



function savePreciosAPI(req, res) {
    //Buscamos la informacion de un esado y municipio ya predefinido CDMX y Miguel Hidalgo
    let url = 'http://api-reportediario.cre.gob.mx/api/EstacionServicio/Petroliferos?entidadId=09&municipioId=016'
    request(url, function (error, response, body) {
        if (response && response.statusCode == 200) {
            let precio = new Precios();
            precio.mes = new Date().getMonth() + 1;
            var array = JSON.parse(body);
           for(let i = 0; i < array.length; i++) {
               let gasolina = array[i];
               if (gasolina.Numero === 'PL/6938/EXP/ES/2015') {
                    if (gasolina.SubProducto.indexOf("(1)") != -1) {
                        precio.magna = gasolina.PrecioVigente;
                    }else if (gasolina.SubProducto.indexOf("(2)") != -1) {
                        precio.premium = gasolina.PrecioVigente;
                    }else if (gasolina.SubProducto.indexOf("(3)") != -1) {
                        precio.diesel = gasolina.PrecioVigente;
                    }
               }
           }
           precio.save((error, precioGuardado) => {
               if (error) {
                   let mensajeError = "Error al guardar en Mongo";
                   util.enviarMail(mensajeError);
                   res.status(404).send({mensage: mensajeError});
               }
               res.status(200).send({mensage: precioGuardado});
           });
        } else {
            let mensajeError = "API no esta funcionando";
            util.enviarMail(mensajeError);
            res.status(404).send({mensage: "API no esta funcionando"});
        }

    });
}


function buscarPrecioPorMes() {

    let mes = new Date().getMonth() + 1;
    Precios.find({mes: mes}, (error, precio) => {
        if (precio && precio.length > 0) {
            console.log('Ya existbuscarPrecioPorMese el precio');
            return '';
        }
        var ruta = util.DEBUG ? 'http://localhost:7080/api/preciosGasolina' : 'https://femtesa.herokuapp.com/api/preciosGasolina';
        console.log(ruta);
        request(ruta, function (error, response, body) {
            console.log(response.statusCode);
            console.log(body);
            return body;
        });
    });


}



module.exports = {
    savePreciosAPI,
    buscarPrecioPorMes,
    sendPrecios
}