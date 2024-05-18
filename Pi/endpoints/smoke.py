from flask_restx import Namespace, Resource
api = Namespace('Smoke', description='smoke endpoint')

import random

@api.route('/smoke', doc={"description": "get the smoke particles"})
class HelloWorld(Resource):
    def get(self):
        smoke = random.randint(0, 100)
        return {'smoke': smoke}
        