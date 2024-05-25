from flask_restx import Namespace, Resource, Api, fields
from flask import Flask, request
import random
import datetime
import sqlite3
import time
import threading

app = Flask(__name__)
api = Api(app)
api = Namespace('SystemSettings', description='System Settings Endpoint')

databaseName = 'C:\\Code\\FDS\\Pi\\sensordata.db'
class systemsettings():    
    def __init__(self, db = 'sensordata.db'):
        global databaseName
        databaseName = db
    
data = api.model('Setting', {
    'Name': fields.String(required=True, description='Setting Name'),
    'Value': fields.String(required=True, description='Setting Value'),
})

@api.route('/Settings', doc={"description": "Get all settings"})
class GetSettings(Resource):
    def get(self):
        print("Using database ", databaseName)
        conn = sqlite3.connect(databaseName)
        cursor = conn.cursor()
        cursor.execute('SELECT Sname, Svalue FROM `Settings` ORDER BY `sname` DESC')
        records = cursor.fetchall()  
        conn.close()    

        result = []
        for record in records:
            result.append({'Name' : record[0], 'Value': record[1]})
        return result
    
@api.route('/Setting/<string:sname>', doc={"description": "Get one setting value"})
@api.param('sname', 'Setting Name')
class GetSetting(Resource):
    def get(self, sname):
        print("Using database ", databaseName)
        conn = sqlite3.connect(databaseName)
        cursor = conn.cursor()
        cursor.execute(f"SELECT Svalue FROM `Settings` where sname='{sname}'")
        records = cursor.fetchall()  
        conn.close()    

        result = []
        for record in records:
            result.append({'Value': record[0]})
        return result

@api.route('/Setting', doc={"description": "Add a new setting"})
class AddSetting(Resource):
    @api.expect(data)
    def post(self):
        data = request.json
        sname = data['Name']
        svalue = data['Value']
        
        print("Using database ", databaseName)
        conn = sqlite3.connect(databaseName)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO `Settings` (Sname, Svalue) VALUES (?, ?)", (sname, svalue))
        conn.commit()
        conn.close()

        return {'message': 'Setting added successfully'}, 201
