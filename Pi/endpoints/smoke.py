from flask_restx import Namespace, Resource, fields
api = Namespace('Smoke', description='smoke endpoint')

import random


smokeP = random.randint(0, 100)


@api.route('/smoke', doc={"description": "get the smoke particals"})
class HelloWorld(Resource):
    def get(self):
        smoke = smokeP
        return {'smoke': smoke}