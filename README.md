# FireGuard Pro (Forest Defense System (FDS))
Welcome to the Forest Defense System (FDS) repository, a system designed for early detection and prevention of wildfires in remote and forested areas.

## Overview

The Forest Defense System (FDS) utilizes a network of sensors connected to Raspberry Pis to detect various environmental conditions such as smoke, temperature changes, and rain as well as visual monitoring through cameras. These sensors continuously monitor the area for any signs of fire or smoke.

## Features

- **Sensor Network**: Utilizes a network of sensors including smoke detectors, temperature sensors, rain sensors, and cameras.
- **Solar-Powered Nodes**: Each node in the network is solar-powered, ensuring continuous operation even in remote areas without access to conventional power sources.
- **Automated Responses**: Upon detecting any changes or triggers from the sensors, the system automatically initiates responses such as email alerts, text alerts, and notifications to emergency responders.
- **Data Visualization**: The data collected from the sensor network can be viewed on a webpage created using Flask and HTML, providing real-time monitoring and visualization of environmental conditions.

## Usage

The Forest Defense System (FDS) continuously monitors the environment for any signs of wildfires. Users can access the web interface to view real-time data and receive alerts in case of any detected anomalies.

## Acknowledgments

We would like to acknowledge the following:

- [Raspberry Pi Foundation](https://www.raspberrypi.org/) for providing the hardware platform.
- [Flask](https://flask.palletsprojects.com/en/3.0.x/) and [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) communities for providing tools for web development.
- [Stack Overflow](https://stackoverflow.com/) for bug fixes 
- my dad for his mega smart brain
- Emergency responders and organizations for their collaboration and support.

## Contact

For any questions or inquiries related to this project, you can reach out to Kyle Seaford via email or GitHub.

## ToDo - ToGet
### sensors / stuff needed 
- [x] temperature sensor
- [ ] smoke sensor
- [ ] rain sensor
- [ ] visual camera
- [ ] solar-powered pi
- [ ] 3D printed box for the whole pi, find out which pole to use

### improvements 
- [ ] improve ip geolocation because it sometimes thinks were in glasgow (we're not.)
- [ ] replace IP location with GPS data
- [ ] improve weather API so it updates more (can't due to free API limit)
- [x] change the "FireGuard Pro - Forest Defense System (FDS)" on the info bar to the logo. (FDS\dashboard\static\imgs\name.png) - messed up the styles too much when i tried 


### screenshots 

- 22/04/24 Good Dashboard 
![goodDash](archive/dash.PNG)

## task for the week

### 29/10/2024
- [x] use the data and show it on a graph on the dashboard
- [ ] simulate a second unit
- [ ] show multiple data on each graph
- [x] show images
- [ ] make the photos move
- [ ] link up the amout of units per zone on the dashboard to the python
