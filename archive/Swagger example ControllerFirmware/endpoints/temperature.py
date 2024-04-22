from flask_restx import Namespace, Resource, fields
api = Namespace('Temperature', description='temp endpoint')

@api.route('/temp', doc={"description": "get the temp"})
class HelloWorld(Resource):
    def get(self):
        return {'Temp': 123.4}