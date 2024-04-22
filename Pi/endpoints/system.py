from flask_restx import Namespace, Resource, fields
api = Namespace('System', description='system endpoint')

import platform

def get_system_name():
    system_name = platform.system()
    return system_name

@api.route('/system', doc={"description": "get system data"})
class HelloWorld(Resource):
    def get(self):
        systemName = get_system_name()
        return {'system name': systemName}