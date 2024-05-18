from flask_restx import Namespace, Resource
import random
import datetime
import sqlite3
import time
import threading


# use this on units with no sensors for testing 
api = Namespace('Temp', description='Temp endpoint')


# use a separate thread to run the data addition function
class DataAdder(threading.Thread):
    def __init__(self):
        super().__init__()
        #self.conn = sqlite3.connect('sensordata.db')
        #self.cursor = self.conn.cursor()
        self.flag = True

    def run(self):
        while self.flag:
            temp = random.randint(0, 100)
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            conn = sqlite3.connect('sensordata.db')
            cursor = conn.cursor()
            cursor.execute('INSERT INTO Temp (Temp, Time) VALUES (?, ?)', (temp, current_time))
            conn.commit()
            conn.close()

            time.sleep(10)

    def close(self):        
        #self.conn.close()
        self.flag = False
        print("close self.flag: ", self.flag)

data_adder = DataAdder()
data_adder.start()

@api.route('/Temp', doc={"description": "get the temperature"})
class HelloWorld(Resource):
    def get(self):
        temp = random.randint(0, 100)
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # add data to db
        data_adder.cursor.execute('INSERT INTO Temp (Temp, Time) VALUES (?, ?)', (temp, current_time))
        data_adder.conn.commit()
        
        return {'message': 'Temperature data stored successfully'}
    
@api.route('/Stop', doc={"description": "Stop the temperature"})
class Stop(Resource):
    def get(self):
        #global flag
        #flag = False
        data_adder.close()
        return {'message': 'Temperature data stopped successfully'}