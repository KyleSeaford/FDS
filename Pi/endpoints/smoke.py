from flask_restx import Namespace, Resource, fields
api = Namespace('Smoke', description='smoke endpoint')


@api.route('/smoke', doc={"description": "get the smoke particals"})
class HelloWorld(Resource):
    def get(self):
        smoke = 20
        return {'smoke': smoke}