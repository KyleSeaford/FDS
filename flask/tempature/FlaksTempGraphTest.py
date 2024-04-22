import os
import glob
import time
import datetime
from flask import Flask, jsonify, render_template

from flask import Flask, render_template, jsonify
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Sensor setup
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c

# Route to get temperature data for unit1
@app.route('/unit1/temp')
def unit1_info():
    temp = read_temp()
    current_time = datetime.datetime.now().strftime("%H:%M:%S")
    return jsonify({'unit1Temp': temp, 'currentTime': current_time})

# HTML page with real-time temperature display in a graph
@app.route('/')
def dashboard():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
