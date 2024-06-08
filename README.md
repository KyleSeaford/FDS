# FireGuard Pro (Forest Defense System (FDS))
Welcome to the Forest Defense System (FDS) repository, a system designed for early detection and prevention of wildfires in remote and forested areas.

## Overview

The Forest Defense System (FDS) utilizes a network of sensors connected to Raspberry Pis to detect various environmental conditions such as smoke, temperature changes, and rain as well as visual monitoring through cameras. These sensors continuously monitor the area for any signs of fire or smoke.

## Features

- **Sensor Network**: Utilizes a network of sensors including smoke detectors, temperature sensors, rain sensors, and cameras.
- **Solar-Powered Nodes**: Each node in the network is solar-powered, ensuring continuous operation even in remote areas without access to conventional power sources.
- **Automated Responses**: Upon detecting any changes or triggers from the sensors, the system automatically initiates responses such as email alerts, text alerts, and notifications to emergency responders.
- **Data Visualization**: The data collected from the sensor network can be viewed on a webpage created using Flask and HTML, providing real-time monitoring and visualization of environmental conditions.

## Screenshots
### Home Page and Overview
- The main dashboard of the Forest Defense System
- The main dashboard with one unit
- The main dashboard with two units

### Sensor Data Visualization
-  Sensor data displayed in a the graphs.

-  Real-time data feed from the sensor network

-  Temperature database
-  Smoke database
-  Rain database

### Automated Responses
- Examples of an alert notifications triggered by the system
- Temperature alert
- Smoke alert
- Rain alert

### Camera Feed
-  Real-time camera feed

-  Smooth transition effect for the camera images

### User Interface Elements
- Configuration page where users can set alert parameters

- Notifications page displaying that there is an active
- Help buttons Tips box
- Configure Zones Button
- Dynamicllly changing Tabbuttons
- Configure Unit Button
- Dynamically changing Unit Table 

### Firmware (units) Page
- Homepage
- Temperature endpoints
- Smoke endpoints
- Rain endpoints
- Camera endpoints
- System settings endpoints

## Usage

The Forest Defense System (FDS) continuously monitors the environment for any signs of wildfires. Users can access the web interface to view real-time data and receive alerts in case of any detected anomalies.

- Example Dashboard: [https://fireguardprodashboard.pythonanywhere.com/](https://fireguardprodashboard.pythonanywhere.com/)
- Example Unit Firmware: [https://fireguardprounit1.pythonanywhere.com/](https://fireguardprounit1.pythonanywhere.com/)

## Contact

For any questions or inquiries related to this project, you can reach out to Kyle Seaford via email or GitHub.

## Contributors 
<a href="https://github.com/kyleseaford/FDS/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kyleseaford/FDS" />
</a>

## ToDo - The list to do is below 
### sensors/stuff needed 
- [x] temperature sensor
- [ ] smoke sensor
- [ ] rain sensor
- [ ] visual camera
- [ ] solar-powered pi
- [ ] 3D printed box for the whole pi, find out which pole to use

### improvements 
- [x] improve IP geolocation because it sometimes thinks we're in Glasgow (we're not.)
- [x] change the "FireGuard Pro - Forest Defense System (FDS)" on the info bar to the logo. (FDS\dashboard\static\imgs\name.png)
- [ ] improve weather API so it updates more (can't due to free API limit)
- [ ] show how many notifications are not cleared
- [ ] improve responsiveness, it's not the best right now
- [ ] improve refreshes 

## tasks
- [x] use the data and show it on a graph on the dashboard
- [x] simulate a second unit
- [x] change the Ip additions in the dashboard code (want only once)
- [x] show multiple data on a graph
- [x] show images
- [x] make the images move
- [x] Removed the hardcoded IP at the bottom of `FlaskTest.py` line `app.run(host='192.168.127.153', port=5000, debug=True)`
- [x] change the notification page to a pop-up page, the same as it is, it just pops up instead
- [x] make the notification button show when a notification is there
- [x] add more graphs
- [x] make the notifications button clear more than just temp
- [x] make code easy to add to new units
