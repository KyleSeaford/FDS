# MARK: FlaskTest.py server file
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


# MARK: App routes dashboard
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


# MARK: Temp data
# fill in the addresses for all the units
unitaddresses_full = ['192.168.127.106']

@app.route('/temp/<int:unit>')
def temp_int(unit):
    return jsonify({'error': 'unit not found'})

@app.route('/temp/<unit>')
def temp_string(unit):
    # get the temperature from the unit
    unitaddress = 'http://' + unit + ':5000/temp/temp'
    response = requests.get(unitaddress)
    return json.loads(response.text)
  
@app.route('/tempdata')
def temps():

    temps = []

    unitaddresses = unitaddresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/temp/temp'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        temp_data = json.loads(response.text)
        temps.append({'unit': unit, 'temp': temp_data['temperature']})

    return jsonify(temps)

# MARK: Smoke data

@app.route('/smoke/<int:unit>')
def smoke_int(unit):
    return jsonify({'error': 'unit not found'})

@app.route('/smoke/<unit>')
def smoke_string(unit):
    # get the smoke from the unit
    unitaddress = 'http://' + unit + ':5000/smoke/smoke'
    response = requests.get(unitaddress)
    return json.loads(response.text)

@app.route('/smokedata')
def smokes():

    smokes = []

    unitaddresses = unitaddresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/smoke/smoke'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        smoke_data = json.loads(response.text)
        smokes.append({'unit': unit, 'smoke': smoke_data['smoke']})

    return jsonify(smokes)

# MARK: Rain data

@app.route('/rain/<int:unit>')
def rain_int(unit):
    return jsonify({'error': 'unit not found'})

@app.route('/rain/<unit>')
def rain_string(unit):
    # get the smoke from the unit
    unitaddress = 'http://' + unit + ':5000/rain/rain'
    response = requests.get(unitaddress)
    return json.loads(response.text)
  
@app.route('/raindata')
def rains():

    rains = []

    unitaddresses = unitaddresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/rain/rain'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        rain_data = json.loads(response.text)
        rains.append({'unit': unit, 'rain': rain_data['rain']})

    return jsonify(rains)

# MARK: Camera data

@app.route('/camera/<int:unit>')
def camera_int(unit):
    return jsonify({'error': 'unit not found'})

@app.route('/camera/<unit>')
def camera_string(unit):
    # get the smoke from the unit
    unitaddress = 'http://' + unit + ':5000/camera/camera'
    response = requests.get(unitaddress)
    return json.loads(response.text)

@app.route('/cameradata')
def cameras():

    cameras = []

    unitaddresses = unitaddresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/camera/camera'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        camera_data = json.loads(response.text)
        cameras.append({'unit': unit, 'camera': camera_data['camera']})
    
    return jsonify(cameras)


# MARK: zone 1 app routes

# fill in the addresses of the units in zone 1
zone1_addresses_full = ['192.168.127.106']

@app.route('/zone1tempdata')
def zone1temps():

    temps = []

    unitaddresses = zone1_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/temp/temp'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        temp_data = json.loads(response.text)
        temps.append({'unit': unit, 'temp': temp_data['temperature']})

    return jsonify(temps)

@app.route('/zone1smokedata')
def zone1smokes():

    smokes = []

    unitaddresses = zone1_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/smoke/smoke'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        smoke_data = json.loads(response.text)
        smokes.append({'unit': unit, 'smoke': smoke_data['smoke']})

    return jsonify(smokes)

@app.route('/zone1raindata')
def zone1rains():

    rains = []

    unitaddresses = zone1_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/rain/rain'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        rain_data = json.loads(response.text)
        rains.append({'unit': unit, 'rain': rain_data['rain']})

    return jsonify(rains)

@app.route('/zone1cameradata')
def zone1cameras():

    cameras = []

    unitaddresses = zone1_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/camera/camera'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        camera_data = json.loads(response.text)
        cameras.append({'unit': unit, 'camera': camera_data['camera']})
    
    return jsonify(cameras)


# MARK: zone 2 app routes

# fill in the addresses of the units in zone 2
zone2_addresses_full = ['']

@app.route('/zone2tempdata')
def zone2temps():

    temps = []

    unitaddresses = zone2_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/temp/temp'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        temp_data = json.loads(response.text)
        temps.append({'unit': unit, 'temp': temp_data['temperature']})

    return jsonify(temps)

@app.route('/zone2smokedata')
def zone2smokes():

    smokes = []

    unitaddresses = zone2_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/smoke/smoke'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        smoke_data = json.loads(response.text)
        smokes.append({'unit': unit, 'smoke': smoke_data['smoke']})

    return jsonify(smokes)

@app.route('/zone2raindata')
def zone2rains():

    rains = []

    unitaddresses = zone2_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/rain/rain'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        rain_data = json.loads(response.text)
        rains.append({'unit': unit, 'rain': rain_data['rain']})

    return jsonify(rains)

@app.route('/zone2cameradata')
def zone2cameras():

    cameras = []

    unitaddresses = zone2_addresses_full
    for unit in unitaddresses:
        unitaddress = 'http://' + unit + ':5000/camera/camera'
        response = requests.get(unitaddress)
        print(json.loads(response.text))

        camera_data = json.loads(response.text)
        cameras.append({'unit': unit, 'camera': camera_data['camera']})
    
    return jsonify(cameras)




# MARK: ip and debug mode

if __name__ == '__main__':
    app.run(host='192.168.127.93', port=5000, debug=True)