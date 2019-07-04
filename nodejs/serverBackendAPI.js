var express = require('express'),
    bodyParser = require('body-parser'),
    user = require('./core/user.js'),
    appl = require('./core/appl.js'),
    team = require('./core/team.js'),
    player = require('./core/player.js'),
    game = require('./core/game.js'),
    event = require('./core/event.js'),
    season = require('./core/season.js'),
    statistics = require('./core/statistics.js');
var config = require('./config');

var winston = require('winston');

const logger = winston.createLogger({
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

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/app/reg', appl.register); //done!
app.post('/team', team.addTeam); //done!
app.post('/player', player.addPlayer); //done!
app.post('/game', game.addGame);

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
});