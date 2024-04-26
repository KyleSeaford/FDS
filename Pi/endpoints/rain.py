from flask_restx import Namespace, Resource
api = Namespace('Rain', description='rain endpoint')

import random


@api.route('/rain', doc={"description": "get the rain particals"})
class HelloWorld(Resource):
    def get(self):
        rain = random.randint(0, 100)
        return {'rain': rain}
    
