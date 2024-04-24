from flask_restx import Namespace, Resource, fields
api = Namespace('Rain', description='rain endpoint')

import random


rainP = random.randint(0, 100)


@api.route('/rain', doc={"description": "get the rain particals"})
class HelloWorld(Resource):
    def get(self):
        rain = rainP
        return {'rain': rain}