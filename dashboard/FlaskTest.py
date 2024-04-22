# Description: This file is a test file for the Flask server. It will be used to show the dashboard 

from flask import Flask, render_template, jsonify
import datetime
import requests
from flask_cors import CORS

from location import get_location
from weather import *

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes


def get_public_ip_address():
    response = requests.get('https://httpbin.org/ip')
    return response.json()['origin']


# app routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/location')
def Location():
    return jsonify({'location': get_location()})

@app.route('/weather')
def weather():
    return jsonify({'weather': get_conditions_all()})

@app.route('/conditions')
def con():
    return jsonify({'conditions': get_conditions()})

@app.route('/windspeed')
def wind():
    return jsonify({'windspeed': get_windspeed()})

@app.route('/ip')
def ip():
    return jsonify({'Public ip': get_public_ip_address()})

@app.route('/current_date')
def current_date():
    return jsonify({'current_date': datetime.datetime.now().strftime("%Y-%m-%d")})

@app.route('/current_time')
def current_time():
    return jsonify({'current_time': datetime.datetime.now().strftime("%H:%M:%S")})



# zone 1
@app.route('/zone1')
def zone():
# will show all info from zone one 
    return"zone1 information will go here"

# unit 1, need to configer which pi the info is coming from  
@app.route('/zone1/unit1')
def unit1_info():
    ip = get_public_ip_address()
    temp = 5
    current_time = datetime.datetime.now().strftime("%H:%M:%S")
    return jsonify({'temperature': temp, 'currentTime': current_time})



if __name__ == '__main__':
    app.run(host='192.168.127.93', port=5000)