from flask_restx import Namespace, Resource, fields
api = Namespace('Rain', description='rain endpoint')


@api.route('/rain', doc={"description": "get the rain particals"})
class HelloWorld(Resource):
    def get(self):
        rain = 5
        return {'rain': rain}