from flask_restx import Namespace, Resource, fields
api = Namespace('GPIO', description='General Purpose Input Output')

@api.route('/mode', doc={"description": "GPIO pin mode"})
class GpioSetPin(Resource):
    def get(self):
        return {'pin': 'need setting'}
    
@api.route('/input', doc={"description": "GPIO pin input"})
class GpioInput(Resource):
    @api.doc('Pin Input get')
    def get(self):
        return {'pin': 'need input'}
    
@api.route('/output', doc={"description": "GPIO pin output"})
class GpioOutput(Resource):
    @api.doc(id='Pin Ouput')
    def get(self):
        return {'pin': 'need output'}
