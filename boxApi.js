'use strict'

//Libreria de Box
var BoxSDK = require('box-node-sdk');


//Acesso desde el token
var sdk = new BoxSDK({
    clientID: 'k4sb2etqa6onmpkq0q1rpnh78zq1zeah',
    clientSecret: 'dkZHN2DCLbPxE0K6c7N59OxjNSTnGSKD',
    iterators: true
});

var client = sdk.getBasicClient('4ScN3mlVNPB4TalSk6MAla9AVQxdEFmj');



module.exports = client;