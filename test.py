from ipinfo import get_ipinfo

def get_location():
    details = get_ipinfo()
    return details.city

city = get_location()
print("City:", city)