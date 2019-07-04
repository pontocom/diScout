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

var playerSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    name: {type: String, required: true},
    nick: String,
    email: String,
    mobile: String,
    picture: String,
    position: String,
    description: String,
    actualTeam: String,
    parentId:String,
    createdAt: Date,
    modifiedAt: Date
});

var Player = mongoose.model('Player',playerSchema);

/**
 *
 * @param req
 * @param res
 */
exports.getPlayer = function(req, res) {
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
                        // Ok, everything seems to be fine, let's go and return the team for the user
                        Player.findOne({uuid:req.params.id}, function (err, player) {
                            console.log("Player dump = " + player);
                            if(player == null) {
                                res.send({status: "ERR: There are no players with the request ID!"});
                            }
                            else {
                                res.send({status: "OK", player: player});
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

exports.addPlayer = function (req, res) {
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
                        // Ok, everything seems to be fine, let's go and add the team on the database

                        var _UUID = uuid.v4();
                        var currDate = new Date().getTime();

                        var player = new Player({
                            uuid: _UUID,
                            name: req.body.name,
                            nick: req.body.nick,
                            email: req.body.email,
                            mobile: req.body.mobile,
                            picture: req.body.picture,
                            position: req.body.position,
                            description: req.body.description,
                            actualTeam: req.body.teamId,
                            parentId:req.body.parentId,
                            createdAt: currDate,
                            modifiedAt: currDate
                        });
                        loggerBackend.info(player);

                        player.save(function (err) {
                            if(err) {
                                loggerBackend.error({status: "ERR", message: err});
                                res.send({status: "ERR", message: "Unable to create the Player on the system! -> " + err});
                            } else {
                                loggerBackend.info({status: "OK", playerId: _UUID});
                                res.send({status: "OK", playerId: _UUID});
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

/**
 * Internal function that will return all the players information that belong to a specific team
 * @param teamId the unique id of the team
 * @param result the result that contains all the players
 */
exports.getPlayers = function(teamId, result) {
    console.log("Inside getPlayers, Team ID = " + teamId);

    Player.find({actualTeam:teamId}, function (err, player) {
        console.log("Players dump = " + player);
        if(player == null) return result(false, null);
        else {
            return result(true, player);
        }
    });
};