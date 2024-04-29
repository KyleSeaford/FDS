# use this on units with no sensors for testing 
from flask_restx import Namespace, Resource
api = Namespace('Temp', description='Temp endpoint')

import random

@api.route('/Temp', doc={"description": "get the tempeture"})
class HelloWorld(Resource):
    def get(self):
        temp = random.randint(0, 100)
        return {'temp': temp}