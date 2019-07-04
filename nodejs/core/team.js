var express = require('express');
var config = require('../config');
var winston = require('winston');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var crypto = require('crypto');
var appl = require('./appl');
var player = require('./player');
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

var teamSchema = new mongoose.Schema({
    uuid: {type: String, required: true},
    name: {type: String, required: true},
    description: String,
    classification: String,
    createdAt: Date,
    modifiedAt: Date
});

var Team = mongoose.model('Team',teamSchema);


/**
 *
 * @param req
 * @param res
 */
exports.getTeam = function(req, res) {
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
                        console.log("req.params.id = " + req.params.id);
                        Team.findOne({uuid:req.params.id}, function (err, team) {
                            console.log("Team dump = " + team);
                            if(team == null) {
                                res.send({status: "ERR: There are no teams with the request ID!"});
                            }
                            else {
                                // Get all the players on the team
                                console.log("Inside getTeam, TeamId = " + req.params.id);
                                player.getPlayers(req.params.id, function (result, players) {
                                    if(result) {
                                        console.log("Player dump = " + players);
                                        var _team = {
                                            "uuid": team.uuid,
                                            "name": team.name,
                                            "description": team.description,
                                            "classification": team.classification,
                                            "createdAt": team.createdAt,
                                            "modifiedAt": team.modifiedAt,
                                            "players": players
                                        };
                                        res.send({status: "OK", team: _team});
                                    } else {
                                        var _team = {
                                            "uuid": team.uuid,
                                            "name": team.name,
                                            "description": team.description,
                                            "classification": team.classification,
                                            "createdAt": team.createdAt,
                                            "modifiedAt": team.modifiedAt,
                                            "players": []
                                        };
                                        res.send({status: "OK", team: _team});
                                    }
                                });
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

exports.addTeam = function (req, res) {
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

                        var team = new Team({
                            uuid: _UUID,
                            name: req.body.name,
                            description: req.body.description,
                            classification: req.body.classification,
                            createdAt: currDate,
                            modifiedAt: currDate
                        });
                        loggerBackend.info(team);

                        team.save(function (err) {
                            if(err) {
                                loggerBackend.error({status: "ERR", message: err});
                                res.send({status: "ERR", message: "Unable to create the Team on the system! -> " + err});
                            } else {
                                loggerBackend.info({status: "OK", appId: _UUID});
                                res.send({status: "OK", teamId: _UUID});
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
