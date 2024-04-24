from flask_restx import Namespace, Resource, fields
api = Namespace('Camera', description='camera endpoint')

import random
import os

image_dir = "FDS\Pi\endpoints\cameraImgs" 
images = os.listdir(image_dir)

random_image = random.choice(images)

@api.route('/camera', doc={"description": "take photo on camera"})
class HelloWorld(Resource):
    def get(self):
        camera = random_image
        return {'camera': camera}