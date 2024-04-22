from flask_restx import Namespace, Resource, fields
api = Namespace('Camera', description='camera endpoint')


@api.route('/camera', doc={"description": "take photo on camera"})
class HelloWorld(Resource):
    def get(self):
        camera = "photo3.png"
        return {'camera': camera}