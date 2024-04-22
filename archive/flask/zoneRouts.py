# zone 1
@app.route('/zone1')
def zone():
# will show all info from zone one 
    return"zone1 information will go here"

# unit 1, need to configer which pi the info is coming from  
@app.route('/zone1/unit1')
def unit1_info():
    ip = get_public_ip_address()
    temp = 5
    current_time = datetime.datetime.now().strftime("%H:%M:%S")
    return jsonify({'temperature': temp, 'currentTime': current_time})
