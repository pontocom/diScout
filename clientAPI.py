from flask import (jsonify, Blueprint, request)
import databaseConnection as db
import authentication as auth
import bcrypt
import datetime
import uuid
import jwt
import configparser
from flasgger.utils import swag_from


client_api = Blueprint('client_api', __name__)
config = configparser.ConfigParser()
config.read('config.ini')


@client_api.route('/user/auth', methods=['POST'])
@swag_from('./apidocs/authentication.yml')
def authentication():
    data = request.values
    headers = request.headers

    print("Client ID = " + headers['clientID'])
    print("API key = " + headers['apiKey'])

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")
    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        print("Client is authenticated - proceed")
        userData = db.checkUserPassword(data['email'], data['password'])
        if not userData:
            return jsonify({'status': False, 'message': 'The username and password are incorrect!'}), 400
        else:
            payload = {'clientId': userData['uuid'], 'email': userData['email'], 'type': userData['type'],
                       'exp': datetime.datetime.utcnow() + datetime.timedelta(
                           seconds=int(config['JWT']['JWT_EXP_DELTA_SECONDS']))}
            jwt_token = jwt.encode(payload, config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            return jsonify({'status': True, 'token': jwt_token.decode('utf-8'), 'userId': userData['uuid']}), 201
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/user', methods=['POST'])
@swag_from('./apidocs/registration.yml')
def registration():
    data = request.values
    headers = request.headers

    print("Receiving request to register a new User => " + data['email'])
    print("Client ID = " + headers['clientID'])
    print("API key = " + headers['apiKey'])

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        print("Client is authenticated - proceed")
        if db.checkUserEmail(data['email']):
            return jsonify({'status': False, 'message': 'This user email has already been registered previously.'}), 400
        else:
            password = str(bcrypt.hashpw(bytes(data['password'], 'utf-8'), bcrypt.gensalt()), 'utf8')

            _UUID = str(uuid.uuid4())
            currDate = datetime.datetime.now()
            user = {'uuid': _UUID, 'name': data['name'], 'email': data['email'], 'password': password,
                    'description': data['description'], 'type': data['type'], 'createdAt': str(currDate),
                    'modifiedAt': str(currDate)}
            if db.insertIntoCollection("users", user):
                return jsonify({'status': True, 'userId': _UUID}), 201
            else:
                return jsonify({'status': False, 'message': 'There was an error adding the new user.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/user/<id>', methods=['GET'])
@swag_from('./apidocs/get_user.yml')
def get_user(id):
    data = request.values
    headers = request.headers

    print("Client ID = " + headers['clientID'])
    print("API key = " + headers['apiKey'])

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")
    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        print("Client is authenticated - proceed")
        # TODO: Get all the user details from the database!!!!
        user = db.getUser(id)
        if user:
            favTeams = db.getTeamsFromUsers(id)
            if favTeams:
                fullUser = {'user': user, 'teams': favTeams}
                return jsonify({'status': True, 'info': fullUser}), 200
            else:
                return jsonify(
                    {'user': user, 'status': False, 'message': 'User without any favourite team associated.'}), 400

        else:
            return jsonify({'status': False, 'message': 'Unable to get player.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client.'}), 400


@client_api.route('/user/fav', methods=['POST'])
def set_user_fav_team():
    data = request.values
    headers = request.headers

    print("Client ID = " + headers['clientID'])
    print("API key = " + headers['apiKey'])

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")
    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        print("Client is authenticated - proceed")
        favTeam = {'uuid': data['uuid'], 'favTeam': data['favTeam']}
        if db.insertIntoCollection("userteams", favTeam):
            return jsonify({'status': True, 'user': data['uuid'], 'favTeam': data['favTeam']}), 201
        else:
            return jsonify({'status': False, 'message': 'There was an error adding the new user.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/team/<id>', methods=['GET'])
def getTeam(id):
    headers = request.headers

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        team = db.getTeam(id)
        if team:
            print("we have a team -> " + str(team))
            players = db.getPlayersFromTeam(id)
            if players:
                fullteam = {'info': team, 'players': players}
                return jsonify({'status': True, 'team': fullteam}), 200
            else:
                return jsonify({'status': False, 'message': 'Team without any players assigned.'}), 400
        else:
            return jsonify({'status': False, 'message': 'Unable to get team.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/season/<id>', methods=['GET'])
def getSeason(id):
    headers = request.headers

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        season = db.getSeason(id)
        if season:
            print("we have a season -> " + str(season))
            games = db.getGamesFromSeason(id)
            if games:
                fullseason = {'info': season, 'games': games}
                return jsonify({'status': True, 'season': fullseason}), 200
            else:
                return jsonify({'status': False, 'message': 'Season without any games assigned.'}), 400
        else:
            return jsonify({'status': False, 'message': 'Unable to get season.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/player/<id>', methods=['GET'])
def getPlayer(id):
    headers = request.headers

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        player = db.getPlayer(id)
        if player:
            stats = db.getStatsFromPlayers(id)
            if stats:
                fullPlayer = {'info': player, 'stats': stats}
                return jsonify({'status': True, 'team': fullPlayer}), 200
            else:
                return jsonify({'info': player, 'status': False, 'message': 'Player without any stats registered.'}), 400

        else:
            return jsonify({'status': False, 'message': 'Unable to get player.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/teams', methods=['GET'])
def getAllTeams():
    headers = request.headers

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        teams = db.getAllTeams()
        if teams:
            return jsonify({'status': True, 'teams': teams}), 200
        else:
            return jsonify({'status': False, 'message': 'No teams available????'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/user/<id>/statistics', methods=['GET'])
def getUserStatistics(id):
    # TODO
    return None


@client_api.route('/event', methods=['POST'])
def add_event():
    data = jsonify(request.values)
    print("Add a single event...")
    if not data.json:
        return jsonify({'status': 'True', 'message': 'Wrong document type'}), 400
    success = db.insertEvent(data.json)
    if not success:
        return jsonify({'status': 'True', 'message': 'Insertion not successful'}), 400
    return jsonify({'status': 'True', 'message': 'Insertion successful'}), 201


@client_api.route('/events', methods=['POST'])
def add_events():
    print("Add multiple events...")
    if not request.json:
        return jsonify({'status': False, 'message': 'Wrong document type - not JSON formated'}), 400
    else:
        success = db.insertEvents(request.json)
        if not success:
            return jsonify({'status': 'True', 'message': 'Insertion not successful'}), 400
        else:
            return jsonify({'status': 'True', 'message': 'All events were registered with success!'}), 201


@client_api.route('/game/<id>', methods=['GET'])
def getGame(id):
    headers = request.headers

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        game = db.getGame(id)
        if game:
            return jsonify({'status': True, 'game': game}), 201
        else:
            return jsonify({'status': False, 'message': 'Unable to get Game.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@client_api.route('/update', methods=['POST'])
def update():
    data = request.values
    headers = request.headers

    clientID = ''
    apiKey = ''

    # used to validate id the headers are being passed or not
    if all(header in headers for header in ("clientID", "apiKey")):
        clientID = headers['clientID']
        apiKey = headers['apiKey']
    else:
        print("HEADERS DO NOT EXIST")

    # authenticate the clientID
    if auth.authenticate_client(clientID, apiKey):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        _UUID = str(uuid.uuid4())
        currDate = datetime.datetime.now()
        stat = {'uuid': _UUID, 'passe': data['passe'], 'remate': data['remate'], 'paraFora': data['paraFora'],
                'recuperacaoDeBola': data['recuperacaoDeBola'], 'perdaDeBola': data['perdaDeBola'],
                'faltaSofrida': data['faltaSofrida'],
                'bolaFundoLateralSofrida': data['bolaFundoLateralSofrida'],
                'bolaFundoLinhaFinalSofrida': data['bolaFundoLinhaFinalSofrida'],
                'faltaCometida': data['faltaCometida'], 'bolaFundoLateralCometida': data['bolaFundoLateralCometida'],
                'bolaFundoLinhaFinalCometida': data['bolaFundoLinhaFinalCometida'],
                'PlayerId': data['playerId'], 'createdAt': str(currDate), 'modifiedAt': str(currDate)}

        if db.insertIntoCollection("stats", stat):
            return jsonify({'status': True, 'statId': _UUID}), 201
        else:
            return jsonify({'status': False, 'message': 'There was an error adding stats.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


'''
@client_api.route('/game/<gameid>', methods=['GET'])
def get_game_info(gameid):
    # TODO: Change to fit API specification
    print("got event")
    events = db.getCompetitionEvents(gameid)
    if events == None:
        print("error in retrieving data")
        return jsonify({'status' : 'True', 'message':'No data for this game'}), 400
    print("found something, sending it back now")
    print(events)
    return jsonify(events), 201
'''

'''
@client_api.route('/statistics/<playerid>|<gameid>|<seasonid>', methods=['GET'])
def get_statistics(playerid, gameid, seasonid):
    # TODO
    return None
'''
