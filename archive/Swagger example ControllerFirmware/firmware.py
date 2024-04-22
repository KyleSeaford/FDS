from flask import Flask
from flask_restx import Api
from endpoints.example import api as namespaceExample
from endpoints.gpio import api as namespaceGpio
from endpoints.system import api as namespaceSystem
from endpoints.temperature import api as namespaceTemperature

app = Flask(__name__)
api = Api(app, version='1.0', title='Controller Firmware', description='Python Firmware Controller')

api.add_namespace(namespaceExample, path='/example')
api.add_namespace(namespaceGpio, path='/gpio')
api.add_namespace(namespaceSystem, path='/system')
api.add_namespace(namespaceTemperature, path='/temp')

if __name__ == '__main__':
    app.run(debug=True)