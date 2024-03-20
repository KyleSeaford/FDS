from flask import Flask, render_template, jsonify
import psutil
import datetime
import platform

app = Flask(__name__)

def get_ram_usage():
    memory_usage = psutil.virtual_memory().percent
    return memory_usage

def get_system_name():
    system_name = platform.system()
    return system_name




@app.route('/')
def home():
    system_name = get_system_name()
    return render_template('index.html', name=system_name)

@app.route('/ram_usage')
def ram_usage():
    ram_usage = get_ram_usage()
    return jsonify({'ram_usage': ram_usage})

@app.route('/current_date')
def current_date():
    return jsonify({'current_date': datetime.datetime.now().strftime("%Y-%m-%d")})

@app.route('/current_time')
def current_time():
    return jsonify({'current_time': datetime.datetime.now().strftime("%H:%M:%S")})

if __name__ == '__main__':
    app.run(debug=True)
