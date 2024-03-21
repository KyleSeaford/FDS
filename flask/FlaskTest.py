from flask import Flask, render_template, jsonify
import psutil
import datetime
import platform
import requests
from flask_cors import CORS

from location import get_location

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

def get_ram_usage():
    memory_usage = psutil.virtual_memory().percent
    return memory_usage

def get_system_name():
    system_name = platform.system()
    return system_name

def get_public_ip_address():
    response = requests.get('https://httpbin.org/ip')
    return response.json()['origin']



@app.route('/')
def home():
    system_name = get_system_name()
    return "FDS "+ system_name

@app.route('/location')
def Location():
    return jsonify({'location': get_location()})

@app.route('/ip')
def ip():
    return jsonify({'ip': get_public_ip_address()})


@app.route('/ram_usage')
def ram_usage():
    ram_usage = get_ram_usage()
    return jsonify({'ram_usage': ram_usage})

@app.route('/current_date')
def current_date():
    return jsonify({'current_date': datetime.datetime.now().strftime("%Y-%m-%d")})

@app.route('/current_time')
def current_time():
    return jsonify({'current_time': datetime.datetime.now().strftime("%H:%M:%S")})

if __name__ == '__main__':
    app.run(debug=True)
