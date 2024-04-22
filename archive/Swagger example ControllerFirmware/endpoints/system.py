from flask_restx import Namespace, Resource, fields
import subprocess

api = Namespace('System', description='Controllers operating system')

@api.route('/shell/<string:command>/<string:arguments>', doc={"description": "Execute shell command"})
@api.param('command', 'Shell command')
@api.param('arguments', 'Command arguments')
class Shell(Resource):
    def put(self, command, arguments):
        output = subprocess.getoutput(command + " " + arguments)
        return {'Output': output}