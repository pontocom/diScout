import databaseConnection as db
import configparser

config = configparser.ConfigParser()
config.read('config.ini')


def authenticate_client(clientID, apiKey):
    print("authentication.py -> authenticate_client")
    print("AUTHENTICATION IS -> " + config['GENERAL']['authentication'])
    if config['GENERAL']['authentication'] == "ON":
        if db.authenticateApplication(clientID, apiKey):
            return True
        else:
            return False
    else:
        return True
