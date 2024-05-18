from flask_restx import Namespace, Resource, Api
from flask import Flask
import random
import datetime
import sqlite3
import time
import threading

app = Flask(__name__)
api = Api(app)
api = Namespace('Temp', description='Temp endpoint')

# Use a separate thread to run the data addition function
class DataAdder(threading.Thread):
    def __init__(self):
        super().__init__()
        self._stop_event = threading.Event()

    def run(self):
        while not self._stop_event.is_set():
            temp = random.randint(0, 100)
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
        temp = random.randint(0, 100)
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
