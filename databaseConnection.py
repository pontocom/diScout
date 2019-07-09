import pymongo
import datetime
import configparser
import bcrypt

# import dataAnalysis.costMatrixDijkstra as dij
# import dataAnalysis.timeSequenceUtils as tsu

config = configparser.ConfigParser()
config.read('config.ini')

client = pymongo.MongoClient(config['DB']['mongodbconn'])

diDatabase = client[config['DB']['mongodbname']]

# collections 
games = diDatabase["games"]
athletes = diDatabase["athletes"]
teams = diDatabase["teams"]
events = diDatabase["events"]
users = diDatabase["users"]
application = diDatabase["applications"]
players = diDatabase["players"]
seasons = diDatabase["seasons"]


def insertApplication(app):
    allNecessaryFields = 'uuid' in app and 'name' in app and 'email' in app and 'password' in app and 'apiKey' in app
    if not allNecessaryFields:
        return False

    application.insert_one(app)
    return True


# This function validates the client API application to check if it is registered or not
def authenticateApplication(clientId, apiKey):
    appl = application.find_one({"uuid": clientId})
    if appl is None:
        return False
    else:
        if appl['apiKey'] == apiKey:
            return True
        else:
            return False


# This function is used to check if a user email exists already or not
def checkUserEmail(email):
    usr = users.find_one({"email": email})
    if usr is None:
        return False
    else:
        return True


def checkUserPassword(email, password):
    usr = users.find_one({"email": email})
    print(usr)
    if usr is None:
        return False
    else:
        print(password.encode('utf-8'))
        print(usr['password'])
        # passwd_to_check = bytes(password, 'utf-8')
        if bcrypt.checkpw(bytes(password, 'utf-8'), bytes(usr['password'], 'utf-8')):
            return usr
        else:
            return False


def insertEvent(event):
    allNecessaryFields = 'userID' in event and 'appID' in event and 'timestamp' in event and 'competition' in event
    if not allNecessaryFields:
        return False
    events.insert_one(event)
    return True


def insertEvents(events):
    allInsertionsSuccessful = True
    for event in events:
        allInsertionsSuccessful = insertEvent(event) and allInsertionsSuccessful
    return allInsertionsSuccessful


def insertIntoCollection(collectionName, document):
    if collectionName == "events":
        return insertEvent(document)
    else:
        return diDatabase[collectionName].insert_one(document)


def getPlayer(id):
    player = players.find_one({'uuid': id})
    if player is not None:
        _player = {'uuid': player['uuid'],
                   'name': player['name'],
                   'nick': player['nick'],
                   'email': player['email'],
                   'mobile': player['mobile'],
                   'picture': player['picture'],
                   'position': player['position'],
                   'description': player['description'],
                   'actualTeam': player['actualTeam'],
                   'parentId': player['parentId']}
        return _player
    else:
        return None


def getTeam(id):
    print("Loading team ID from DB: " + id)
    team = teams.find_one({'uuid': id})
    if team is not None:
        print(team)
        _team = {'uuid': team['uuid'],
                 'name': team['name'],
                 'description': team['description'],
                 'classification': team['classification']}
        return _team
    else:
        return False


def getAllTeams():
    print("Getting all the teams")
    cur = teams.find({})
    ateams = []
    for team in cur:
        ateams.append(getTeam(team['uuid']))
    return ateams


def getSeason(id):
    print("Loading season ID from DB: " + id)
    season = seasons.find_one({'uuid': id})
    if season is not None:
        print(season)
        _season = {'uuid': season['uuid'],
                   'name': season['name']}
        return _season
    else:
        return False


def getPlayersFromTeam(teamId):
    cur = players.find({'actualTeam': teamId})
    tplayers = []
    for player in cur:
        tplayers.append(getPlayer(player['uuid']))
    return tplayers


def getGamesFromSeason(seasonId):
    cur = games.find({'season': seasonId})
    tgames = []
    for game in cur:
        tgames.append(getGame(game['uuid']))
    return tgames


def getGame(id):
    game = games.find_one({'uuid': id})
    if game is None:
        return False
    else:
        _game = {'uuid': game['uuid'],
                 'homeTeamId': game['homeTeamId'],
                 'awayTeamId': game['awayTeamId'],
                 'field': {
                     'name': game['field']['name'],
                     'address': game['field']['address'],
                     'latt': game['field']['latt'],
                     'logt': game['field']['logt']
                 },
                 'date': game['date'],
                 'hour': game['hour'],
                 'description': game['description']}
        return _game


def getCompetitionEvents(gameID):
    competition = competitions.find_one({"gameid": gameID})
    if competition is None:
        print("couldn't find the game")
        return None
    if "events" in competition:
        return competition["events"]
    # create events from user data
    userEvents = {}
    for event in events.find({"competition": gameID}):
        user = event["userID"]
        eventType = event["event"]
        timestamp = event["timestamp"]
        if user in userEvents:
            userEvents[user].append((eventType, datetime.datetime.strptime(timestamp, '%H:%M:%S.%f')))
        else:
            userEvents[user] = [(eventType, datetime.datetime.strptime(timestamp, '%H:%M:%S.%f'))]
    sequences = []
    for user in userEvents:
        sequences.append(userEvents[user])
    path = dij.aStarTimeWarpingPathWithTimestamps(sequences)
    resultSequence = tsu.extractOriginalWithTime(path, sequences)
    # add result events to game document
    jsonSequence = list({"event": str(s[0]), "timestamp": str(s[1])} for s in resultSequence)
    competition["events"] = jsonSequence
    competitions.update_one({"id:": gameID}, {"$set": competition}, upsert=False)
    return jsonSequence
