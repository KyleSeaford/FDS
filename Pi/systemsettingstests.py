import unittest
import tempfile
import sqlite3
import json
from flask import Flask
from flask_restx import Api, Namespace, Resource
import os
from endpoints.systemsettings import systemsettings
from endpoints.systemsettings import api as namespaceSystemSettings
from flask_cors import CORS

class SystemSettingsTestCase(unittest.TestCase):
    def setUp(self):
        # Create a temporary file to use as a test database
        self.db_fd, self.db_path = tempfile.mkstemp()

        # Initialize the database with the test schema and data
        self.init_db()

        # Override the database path in the SystemSettings class
        systemsettings(self.db_path)

        # Create the Flask test client
        self.app = Flask(__name__)
        CORS(self.app)  # Allow CORS for all routes
        self.api = Api(self.app, version='1.0', title='PI Firmware', description='Pi Side Firmware Controller')
        self.api.add_namespace(namespaceSystemSettings, path='/systemsettings')
        #self.app.run(host='0.0.0.0', port=5500, debug=False)
        
        self.client = self.app.test_client()
        self.app.config['TESTING'] = True

    def tearDown(self):
        # Close and remove the temporary database
        os.close(self.db_fd)
        os.unlink(self.db_path)

    def init_db(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE Settings (Sname TEXT, Svalue TEXT)')
        cursor.execute('INSERT INTO Settings (Sname, Svalue) VALUES (?, ?)', ('Setting1', 'Value1'))
        cursor.execute('INSERT INTO Settings (Sname, Svalue) VALUES (?, ?)', ('Setting2', 'Value2'))
        conn.commit()
        conn.close()

    def test_get_settings(self):
        # Make a GET request to the /systemsettings/Settings endpoint
        response = self.client.get('/systemsettings/Settings')

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        data = json.loads(response.data)

        # Check that the response contains the expected data
        expected_data = [
            {'Name': 'Setting2', 'Value': 'Value2'},
            {'Name': 'Setting1', 'Value': 'Value1'}
        ]
        self.assertEqual(data, expected_data)

    def test_get_setting(self):
        # Make a GET request to the /systemsettings/Settings endpoint
        response = self.client.get('/systemsettings/Setting/Setting1')

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        data = json.loads(response.data)

        # Check that the response contains the expected data
        expected_data = [
            {'Value': 'Value1'}
        ]
        self.assertEqual(data, expected_data)

if __name__ == '__main__':
    unittest.main()

