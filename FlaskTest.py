import matplotlib.pyplot as plt
from flask import Flask, render_template, jsonify
import psutil
import datetime

app = Flask(__name__)

# functions to get the system usage
def get_ram_usage():
    # Get the system memory usage in percentage
    memory_usage = psutil.virtual_memory().percent
    return memory_usage

@app.route('/ram_usage')
def ram_usage():
    ram_usage = get_ram_usage()
    return jsonify({'ram_usage': ram_usage})


@app.route('/current_time')
def current_time():
    return jsonify({'current_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
# main route
@app.route('/')
def home():
    return render_template('index.html')





if __name__ == '__main__':
    app.run(debug=True)