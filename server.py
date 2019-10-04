from flask import (
    Flask,
    render_template,
    Blueprint
)
from flask_cors import CORS
import clientAPI as client_api
import adminAPI as admin_api
from flasgger import Swagger

template = {
  "swagger": "2.0",
  "info": {
    "title": "diScout API",
    "description": "An API for scouting players!",
    "contact": {
      "responsibleOrganization": "ISCTE - Instituto Universitário de Lisboa",
      "responsibleDeveloper": "Carlos Serrão",
      "email": "carlos.serrao@iscte-iul.pt",
      "url": "istar.iscte-iul.pt",
    },
    "termsOfService": "http://me.com/terms",
    "version": "0.0.1"
  },
  "host": "127.0.0.1:5000",  # overrides localhost:500
  "basePath": "/",  # base bash for blueprint registration
  "schemes": [
    "http",
    "https"
  ],
  "operationId": "getmyData"
}

# Create the application instance
app = Flask(__name__, template_folder="templates")
CORS(app)
Swagger(app, template=template)


def find_blueprint(api):
    for obj in vars(api).values():
        if isinstance(obj, Blueprint):
            return obj
    return None


app.register_blueprint(find_blueprint(client_api))
app.register_blueprint(find_blueprint(admin_api))


# Create a URL route in our application for "/"
# This is purely to see if the server is running, there is currently no website planned
@app.route('/')
def home():
    """
    This function just responds to the browser ULR
    localhost:5000/

    :return:        the rendered template 'home.html'
    """
    return render_template('home.html')


# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
