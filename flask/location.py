import requests

def get_location():
    response_ip = requests.get('https://httpbin.org/ip')
    ip = response_ip.json()['origin']
    response_location = requests.get(f'http://ip-api.com/json/{ip}')
    location_data = response_location.json()
    return location_data['city']

print(get_location())