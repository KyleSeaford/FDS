# ram usage, not used any more
import psutil

def get_ram_usage():
    memory_usage = psutil.virtual_memory().percent
    return memory_usage

#@app.route('/ram_usage')
def ram_usage():
    ram_usage = get_ram_usage()
    return jsonify({'ram_usage': ram_usage})
