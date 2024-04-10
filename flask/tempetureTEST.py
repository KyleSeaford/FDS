import os
import glob
import time
import random
from bokeh.plotting import figure, show
from bokeh.io import output_notebook

# Existing code for reading temperature
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c

# New code for plotting temperature data with Bokeh
output_notebook() # Output to Jupyter Notebook
p = figure(title="Temperature Graph", x_axis_label="Time", y_axis_label="Temperature (°C)")
temps = [] # Store temperature data here
times = [] # Store time data here

while True:
    temp_c = read_temp()
    temps.append(temp_c) # Add temperature data to list
    times.append(time.time()) # Add time data to list
    p.line(times, temps, legend_label="Temperature", line_width=2)
    show(p) # Display graph
    time.sleep(1) # Wait for 1 second