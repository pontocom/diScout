var express = require('express');
var config = require('../config');
var winston = require('winston');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var crypto = require('crypto');

mongoose.connect(config.MongoDBURL);

const loggerMobile = winston.createLogger({
    transports: [
        new(winston.transports.Console)({
            colorize: true
        }),
        new(winston.transports.File)({
            filename: config.MobileAPILogFileName,
            colorize: false,
            json: false
        })
    ]
});

const loggerBackend = winston.createLogger({
    transports: [
        new(winston.transports.Console)({
            colorize: true
        }),
        new(winston.transports.File)({
            filename: config.BackendAPILogFileName,
            colorize: false,
            json: false
        })
    ]
});

var appSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    description: String,
    APIkey: String,
    createdAt: Date,
    modifiedAt: Date
});

var Application = mongoose.model('Application', appSchema);

/**
 * This is responsible for authenticating each of the requests made to the API
 * @param clientId
 * @param apiKey
 * @param result
 * @returns {*}
 */
exports.authentication = function(clientId, apiKey, result) {
    var authenticationResult = true;
    console.log(clientId);
    console.log(apiKey);

    /* check if both the clientId is registered and if the apiKey is assigned to it */

    Application.findOne({uuid:clientId}, function (err, application) {
        console.log("Application dump = " + application);
       if(application == null) return result(false);
       else {
           if(application.APIkey == apiKey) {
               return result(true);
           } else {
               return result(false);
           }
       }
    });
};

/**
 * API entry responsible for the registration of a new application with API
 * @param req
 * @param res
 */
exports.register = function (req, res) {
    loggerBackend.info(req.body);
    console.log(req.body);

    /* creates an hash of the user password*/
    var password = bcrypt.hashSync(req.body.password, config.appsalt, null);
    loggerBackend.info(password);

    /* generates the secret API key used to authenticate application API calls*/
    /**
     * This part describes the algorithm that is used to establish the secret API tokens
     */
    var _UUID = uuid.v4();
    var currDate = new Date().getTime();
    var _UUID2 = req.body.email + uuid.v4() + currDate + password;

    loggerBackend.info(currDate);
    loggerBackend.info(_UUID2);

    var apiKey = crypto.createHash('sha1').update(_UUID2).digest('hex');

    loggerBackend.info(apiKey);


    var application = new Application({
        uuid: _UUID,
        name: req.body.name,
        email: req.body.email,
        password: password,
        description: req.body.description,
        APIkey: apiKey,
        createdAt: currDate,
        modifiedAt: currDate
    });
    loggerBackend.info(application);

    application.save(function (err) {
       if(err) {
           loggerBackend.error({status: "ERR", message: err});
           res.send({status: "ERR", message: err});
       } else {
           loggerBackend.info({status: "OK", appId: _UUID, apiKey: apiKey});
           res.send({status: "OK", appId: _UUID, apiKey: apiKey});
       }
    });

};


