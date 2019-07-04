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

var gameSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    homeTeamId: {type: String, required: true},
    awayTeamId: {type: String, required: true},
    field: {
        name: String,
        address: String,
        latt: String,
        logt: String
    },
    date: String,
    hour: String,
    description: String,
    createdAt: Date,
    modifiedAt: Date
});

var Game = mongoose.model('Game',gameSchema);

exports.getGame = function(req, res) {
    console.log(req.body);

    res.send({status: "OK"});
};

exports.addGame = function(req, res) {
    console.log(req.body);

    appl.authentication(req.headers.clientid, req.headers.apikey, function (result) {
        if(result) {
            /* APIkey authenticated with success, next we need to proceed and authenticate the user token */

            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            if(token) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if(err) {
                        res.send({status: "ERR", message: "Failed to authenticate the token!!! Reason => " + err});
                    } else {
                        // Ok, everything seems to be fine, let's go and add the game on the database

                        var _UUID = uuid.v4();
                        var currDate = new Date().getTime();

                        var game = new Game({
                            uuid: _UUID,
                            homeTeamId: req.body.homeTeamId,
                            awayTeamId: req.body.awayTeamId,
                            field: {
                                name: req.body.fieldName,
                                address: req.body.fieldAddress,
                                latt: req.body.fieldLatt,
                                logt: req.body.fieldLogt
                            },
                            date: req.body.date,
                            hour: req.body.hour,
                            description: req.body.description,
                            createdAt: currDate,
                            modifiedAt: currDate
                        });
                        loggerBackend.info(game);

                        game.save(function (err) {
                            if(err) {
                                loggerBackend.error({status: "ERR", message: err});
                                res.send({status: "ERR", message: "Unable to create the Player on the system! -> " + err});
                            } else {
                                loggerBackend.info({status: "OK", playerId: _UUID});
                                res.send({status: "OK", gameId: _UUID});
                            }
                        });
                    }
                });
            } else {
                res.send({status: "ERR", message: "Token NOT received!!!"});
            }

        } else {
            res.send({status: "ERR: The API authentication has failed!"});
        }
    });
};
