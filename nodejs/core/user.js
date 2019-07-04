var express = require('express');
var config = require('../config');
var winston = require('winston');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var crypto = require('crypto');
var appl = require('./appl');
var jwt = require('jsonwebtoken');


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

var userSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    description: String,
    type: String,
    createdAt: Date,
    modifiedAt: Date
});

var User = mongoose.model('User', userSchema);

exports.checkEmail = function(email, result) {
    /* check if this email is already registered */

    User.findOne({email:email}, function (err, user) {
        console.log("User dump = " + user);
        if(user == null) {
            return result(true); // email does not yet exists
        }
        else {
            return result(false);
        }
    });
};

exports.authentication = function(req, res) {
    console.log(req.body);

    appl.authentication(req.headers.clientid, req.headers.apikey, function (result) {
        if(result) {
            /* APIkey authenticated with success, next we need to proceed and authenticate the user */

            /* creates an hash of the user password*/
            var password = bcrypt.hashSync(req.body.password, config.usersalt, null);
            console.log(req.body.email);
            console.log(password);

            User.findOne({email:req.body.email, password: password}, function (err, user) {
                console.log("User dump = " + user);
                if(user == null) {
                    res.send({status: "ERR: The User authentication has failed!"});
                }
                else {
                    var payload = {
                        clientId: user.uuid,
                        email: user.email,
                        type: user.type
                    };
                    var token = jwt.sign(payload, config.secret, {expiresIn: 30*24*60*60});
                    res.send({status: "OK", token: token});
                }
            });
        } else {
            res.send({status: "ERR: The API authentication has failed!"});
        }
    });
};

exports.registration = function(req, res) {
    console.log(req.headers);
    console.log("Body dump => " + req.body);

    appl.authentication(req.headers.clientid, req.headers.apikey, function (result) {
        if(result) {
            /* APIkey authenticated with success, next we need to proceed and register a new user */

            /* check if the user email is duplicated or not - it musk be unique */
            exports.checkEmail(req.body.email, function (result) {
                if(result) {
                    /* creates an hash of the user password*/
                    var password = bcrypt.hashSync(req.body.password, config.usersalt, null);
                    loggerBackend.info(password);

                    var _UUID = uuid.v4();
                    var currDate = new Date().getTime();

                    var user = new User({
                        uuid: _UUID,
                        name: req.body.name,
                        email: req.body.email,
                        password: password,
                        description: req.body.description,
                        type: req.body.type,
                        createdAt: currDate,
                        modifiedAt: currDate
                    });
                    loggerBackend.info(user);

                    user.save(function (err) {
                        if(err) {
                            loggerBackend.error({status: "ERR", message: err});
                            res.send({status: "ERR", message: "Unable to create the User on the system! -> " + err});
                        } else {
                            loggerBackend.info({status: "OK", appId: _UUID});
                            res.send({status: "OK", userid: _UUID});
                        }
                    });
                } else {
                    res.send({status: "ERR: This email is already registered!!!"});
                }
            });
        } else {
            res.send({status: "ERR: The API authentication has failed!"});
        }
    });

};
