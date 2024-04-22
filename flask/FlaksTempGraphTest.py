import os
import glob
import time
import datetime
from flask import Flask, jsonify

app = Flask(__name__)

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

# HTML page with real-time temperature display
html_page = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Real-Time Temperature</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <h1>Unit 1 Temperature:</h1>
    <p id="unit1Temp"></p>
    <script>
        // Initialize the current temp from the sensor to server
        $(document).ready(function(){
            setInterval(function(){
                $.getJSON('/unit1/temp', function(data) {
                    $('#unit1Temp').text('Temperature: ' + data.unit1Temp + '°C');
                });
            }, 1000); // Update every second
        });
    </script>
</body>
</html>
"""

# Route for the dashboard page
@app.route('/')
def dashboard():
    return html_page

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
