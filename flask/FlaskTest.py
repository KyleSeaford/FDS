from flask import Flask, render_template, jsonify
import datetime
import platform
import requests
from flask_cors import CORS

from location import get_location
from weather import *

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes


def get_system_name():
    system_name = platform.system()
    return system_name

def get_public_ip_address():
    response = requests.get('https://httpbin.org/ip')
    return response.json()['origin']


# app routes
@app.route('/')
def home():
    system_name = get_system_name()
    return f"Forest Defense System (FDS), running on {system_name}. Visit <a href='/location'>/location</a>, <a href='/weather'>/weather</a>, <a href='/conditions'>/conditions</a>, <a href='/windspeed'>/windspeed</a>, <a href='/ip'>/ip</a>, <a href='/current_date'>/current_date</a>, <a href='/current_time'>/current_time</a> for more information."

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

if __name__ == '__main__':
    app.run(debug=True)
