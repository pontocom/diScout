from flask import (jsonify, Blueprint, request)
import databaseConnection as db
import authentication as auth
import uuid
import datetime
import configparser
import bcrypt
import hashlib
import jwt

admin_api = Blueprint('admin_api', __name__)
config = configparser.ConfigParser()
config.read('config.ini')


# Register a new app on the system
@admin_api.route('/app/reg', methods=['POST'])
def register():
    data = request.values
    print("Receiving request to register APP => " + data['name'])
    password = bcrypt.hashpw((data['password']).encode('utf-8'), bcrypt.gensalt())
    # test = bcrypt.checkpw((data['password']).encode('utf-8'), password)
    # print("Test = " + str(test))

    _UUID = str(uuid.uuid4())
    currDate = datetime.datetime.now()
    _UUID2 = data['email'] + _UUID + str(currDate) + data['password']
    apiKey = hashlib.sha1(_UUID2.encode('utf-8')).hexdigest()

    application = {'uuid': _UUID, 'name': data['name'],'email': data['email'],'password': str(password),'description': data['description'],'apiKey': apiKey,'createdAt': str(currDate),'modifiedAt': str(currDate)}

    success = db.insertApplication(application)
    if not success:
        return jsonify({'status': False, 'message':'Application registration has failed'}), 400

    return jsonify({'status': True, 'appId': _UUID, 'apiKey': apiKey}), 201


@admin_api.route('/team', methods=['POST'])
def addTeam():
    data = request.values
    headers = request.headers

    if auth.authenticate_client(headers['clientID'], headers['apiKey']):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status' : False, 'message':'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status' : False, 'message':'Token has expired'}), 400

        _UUID = str(uuid.uuid4())
        currDate = datetime.datetime.now()
        team = {'uuid': _UUID, 'name': data['name'], 'description': data['description'], 'classification': data['classification'], 'createdAt': str(currDate), 'modifiedAt': str(currDate)}

        if db.insertIntoCollection("teams", team):
            return jsonify({'status': True, 'teamId': _UUID}), 201
        else:
            return jsonify({'status': False, 'message': 'There was an error adding the new team.'}), 400
    else:
        return jsonify({'status': False, 'message':'The request was made from a non-authenticated client'}), 400


@admin_api.route('/player', methods=['POST'])
def addPlayer():
    data = request.values
    headers = request.headers

    if auth.authenticate_client(headers['clientID'], headers['apiKey']):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message':'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status' : False, 'message':'Token has expired'}), 400

        _UUID = str(uuid.uuid4())
        currDate = datetime.datetime.now()
        player = {'uuid': _UUID, 'name': data['name'], 'nick': data['nick'], 'email': data['email'], 'picture': data['picture'], 'mobile': data['mobile'], 'position': data['position'], 'description': data['description'], 'actualTeam': data['teamId'], 'parentId': data['parentId'], 'createdAt': str(currDate), 'modifiedAt': str(currDate)}

        if db.insertIntoCollection("players", player):
            return jsonify({'status': True, 'playerId': _UUID}), 201
        else:
            return jsonify({'status': False, 'message': 'There was an error adding the new player.'}), 400
    else:
        return jsonify({'status': False, 'message':'The request was made from a non-authenticated client'}), 400

'''
@admin_api.route('/game', methods=['POST'])
def addGame():
    dbEntry = db.insertIntoCollection('competitions', request.json)
    return jsonify({'status': True, 'message': 'Game insertion successful.', 'gameid': str(dbEntry.inserted_id)})
'''


@admin_api.route('/season', methods=['POST'])
def addSeason():
    data = request.values
    headers = request.headers

    if auth.authenticate_client(headers['clientID'], headers['apiKey']):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message':'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message':'Token has expired'}), 400

        _UUID = str(uuid.uuid4())
        currDate = datetime.datetime.now()
        season = {'uuid': _UUID, 'name': data['name'], 'createdAt': str(currDate), 'modifiedAt': str(currDate)}

        if db.insertIntoCollection("seasons", season):
            return jsonify({'status': True, 'seasonId': _UUID}), 201
        else:
            return jsonify({'status': False, 'message': 'There was an error adding the new season.'}), 400
    else:
        return jsonify({'status': False, 'message':'The request was made from a non-authenticated client'}), 400


@admin_api.route('/game', methods=['POST'])
def addGame():
    data = request.values
    headers = request.headers

    print("adminAPI -> addGame()")

    if auth.authenticate_client(headers['clientID'], headers['apiKey']):
        if config['GENERAL']['authentication'] == "ON":
            try:
                jwt.decode(headers['x-access-token'], config['JWT']['JWT_SECRET'], config['JWT']['JWT_ALGORITHM'])
            except jwt.exceptions.DecodeError:
                return jsonify({'status': False, 'message': 'Invalid client token'}), 400
            except jwt.exceptions.ExpiredSignature:
                return jsonify({'status': False, 'message': 'Token has expired'}), 400

        _UUID = str(uuid.uuid4())
        currDate = datetime.datetime.now()
        game = {'uuid': _UUID,
            'season': data['season'],
            'homeTeamId': data['homeTeamId'],
            'awayTeamId': data['awayTeamId'],
            'field': {
                'name': data['fieldName'],
                'address': data['fieldAddress'],
                'latt': data['fieldLatt'],
                'logt': data['fieldLogt']
            },
            'date': data['date'],
            'hour': data['hour'],
            'description': data['description'],
            'result': data['result'],
            'createdAt': currDate,
            'modifiedAt': currDate}

        if db.insertIntoCollection("games", game):
            return jsonify({'status': True, 'gameId': _UUID}), 201
        else:
            return jsonify({'status': False, 'message': 'There was an error adding the new game.'}), 400
    else:
        return jsonify({'status': False, 'message': 'The request was made from a non-authenticated client'}), 400


@admin_api.route('/game/<id>/statistics', methods=['GET'])
def getGameStatistics(id):
    #TODO
    return None


@admin_api.route('/season/<id>/statistics', methods=['GET'])
def getSeasonStatistics(id):
    #TODO
    return None


@admin_api.route('/player/<id>/statistics', methods=['GET'])
def getPlayerStatistics(id):
    #TODO
    return None
