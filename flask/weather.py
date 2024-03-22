import requests
import urllib.request
import json

def get_location():
    response_ip = requests.get('https://httpbin.org/ip')
    ip = response_ip.json()['origin']
    response_location = requests.get(f'http://ip-api.com/json/{ip}')
    location_data = response_location.json()
    return location_data['city']

address = get_location()

response = urllib.request.urlopen(f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{address}/today?unitGroup=metric&include=current&key=PCL8VTTZCDPPNRMWBPUGY2DFQ&contentType=json")
weather_data = json.loads(response.read().decode('utf-8'))

# Extract current conditions
current_conditions = weather_data['currentConditions']

conditions = current_conditions['conditions']

