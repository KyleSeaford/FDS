# Description: This file is a test file for the Flask server. It will be used to show the dashboard 

from flask import Flask, render_template, jsonify
import datetime
import requests
from flask_cors import CORS

from location import get_location
from weather import *
import json

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




@app.route('/temp/<int:unit>')
def temp_int(unit):
    return jsonify({'temperature': 6, 'unit': unit})

@app.route('/temp/<unit>')
def temp_string(unit):
    # get the temperature from the unit
    unitaddress = 'http://' + unit + ':5000/temp/temp'
    response = requests.get(unitaddress)
    return json.loads(response.text)

@app.route('/temps')
def temps():

    temps = []

    unitaddresses = ['192.168.127.106']
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/temp/temp'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        temp_data = json.loads(response.text)
        temps.append({'unit': unit, 'temp': temp_data['temperature']})

    return jsonify(temps)

if __name__ == '__main__':
    app.run(host='192.168.127.93', port=5000, debug=True)