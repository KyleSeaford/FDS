from flask import send_file
from flask_restx import Namespace, Resource
import random
import os

api = Namespace('Camera', description='camera endpoint')


# random images pls ignore 
image_dir = "/home/robot/FDS/FDS/Pi/endpoints/cameraImgs"

@api.route('/camera', doc={"description": "take photo on camera"})
class HelloWorld(Resource):
    def get(self):
        images = os.listdir(image_dir)
        random_image = random.choice(images)
        image_path = os.path.join(image_dir, random_image)
        return send_file(image_path, mimetype='image/jpeg')