from flask_restx import Namespace, Resource
api = Namespace('Temperature', description='temp endpoint')

import os
import glob
import time
import datetime
import sqlite3
import threading


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

# Use a separate thread to run the data addition function
class DataAdder(threading.Thread):
    def __init__(self):
        super().__init__()
        self._stop_event = threading.Event()

    def run(self):
        while not self._stop_event.is_set():
            temp = read_temp()
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            conn = sqlite3.connect('sensordata.db')
            cursor = conn.cursor()
            cursor.execute('INSERT INTO Temp (Temp, Time) VALUES (?, ?)', (temp, current_time))
            conn.commit()
            conn.close()

            time.sleep(5)

    def stop(self):        
        self._stop_event.set()
        print("Data addition stopped")

data_adder = DataAdder()
data_adder.start()

@api.route('/Temp', doc={"description": "Get the temperature"})
class HelloWorld(Resource):
    def get(self):
        temp = read_temp()
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Add data to db
        conn = sqlite3.connect('sensordata.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO Temp (Temp, Time) VALUES (?, ?)', (temp, current_time))
        conn.commit()
        conn.close()
        
        return {'message': 'Temperature data stored successfully'}

@api.route('/Stop', doc={"description": "Stop the temperature data addition"})
class Stop(Resource):
    def get(self):
        data_adder.stop()
        data_adder.join()  # Ensure the thread has finished
        return {'message': 'Temperature data addition stopped successfully'}
