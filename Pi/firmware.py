# pi side 
from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from endpoints.systemN import api as namespaceSystem
from endpoints.tempNOsensor import api as namespaceTemperature # change to tempNOsensor.py if unit has no sensor
from endpoints.smoke import api as namespaceSmoke
from endpoints.rain import api as namespaceRain
from endpoints.camera import api as namespaceCamera

from endpoints.stop import api as namespaceStop 

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes
api = Api(app, version='1.0', title='Controller Firmware', description='Python Firmware Controller')

api.add_namespace(namespaceSystem, path='/system')
api.add_namespace(namespaceTemperature, path='/Temp')
api.add_namespace(namespaceSmoke, path='/smoke')
api.add_namespace(namespaceRain, path='/rain')
api.add_namespace(namespaceCamera, path='/camera')

api.add_namespace(namespaceStop, path='/stop')


if __name__ == '__main__':
    app.run(host='192.168.127.153', port=5500, debug=False)
