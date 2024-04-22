from flask import Flask
from flask_restx import Api
from endpoints.system import api as namespaceSystem
from endpoints.temperature import api as namespaceTemperature
from endpoints.smoke import api as namespaceSmoke
from endpoints.rain import api as namespaceRain

app = Flask(__name__)
api = Api(app, version='1.0', title='Controller Firmware', description='Python Firmware Controller')

api.add_namespace(namespaceSystem, path='/system')
api.add_namespace(namespaceTemperature, path='/temp')
api.add_namespace(namespaceSmoke, path='/smoke')
api.add_namespace(namespaceRain, path='/rain')

if __name__ == '__main__':
    app.run(debug=True)