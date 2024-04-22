from flask_restx import Namespace, Resource, fields
api = Namespace('Example', description='A simple example endpoint')

@api.route('/hello', doc={"description": "A simple example with no parmeters"})
class HelloWorld(Resource):
    def get(self):
        return {'Message': 'Hello World'}
    

@api.route('/hello2/<string:id>', doc={"description": "A simple example with one string parmeter"})
@api.param('id', 'The example identifier')
class HelloWorld2(Resource):    
    def get(self, id):
        return {'Message': 'Get ' + id}
    
    def put(self, id):
        return {'Message': 'Put ' + id}
    

@api.route('/hello3/<int:a>/<int:b>', doc={"description": "A simple example with two int parmeters"})
@api.param('a', 'Value a')
@api.param('b', 'Value b')
class HelloWorld3(Resource):
    def get(self, a, b):
        return {'Message': 'Get ' + str(a + b)}
    
    def put(self, a, b):
        return {'Message': 'Put ' + str(a + b)}