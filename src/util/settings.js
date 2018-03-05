'use strict'

const nodemailer = require('nodemailer');


const DEBUG = false;

var transporter = nodemailer.createTransport('smtps://ymendez15@it-system.net:95jGZKW32kNxDynQ@smtp-relay.sendinblue.com');

var mailOptions = {
    from: 'Femtesa <contacto@it-system.net>', // sender address
    to: 'yosimar.mendez@ryndem.mx', // list of receivers
    subject: 'Precio de Gasolina', // Subject line
    text: 'No se puedo guardar las gasolina del mes', // plaintext body
    html: '<b>No se puedo guardar las gasolina del mes</b>' // html body
};


function enviarMail(mensaje) {
    mailOptions.text = mensaje;
    mailOptions.html = '<b>' + mensaje + '</b>'
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = {
    DEBUG,
    mailOptions,
    transporter,
    enviarMail
}