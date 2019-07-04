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
            filename: config.MobileAPILogFileName,
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

app.post('/user/auth', user.authentication); //done!
app.post('/user', user.registration); //done!
app.get('/team/:id', team.getTeam); //done!
app.get('/player/:id', player.getPlayer); //done!
app.post('/event', event.setEvent);
app.get('/game/:id', game.getGame);
app.get('/season/:id', season.getSeason);
app.get('/statistics/:id', statistics.getStatistics);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
    logger.info("Listening at http://" + host + ":" + port);
});