# FireGuard Pro (Forest Defense System (FDS))
Welcome to the Forest Defense System (FDS) repository, a system designed for early detection and prevention of wildfires in remote and forested areas.

## Overview

The Forest Defense System (FDS) utilizes a network of sensors connected to Raspberry Pis to detect various environmental conditions such as smoke, temperature changes, rain as well as visual monitoring through cameras. These sensors continuously monitor the area for any signs of fire or smoke.

## Features

- **Sensor Network**: Utilizes a network of sensors including smoke detectors, temperature sensors, rain sensors, and cameras.
- **Solar-Powered Nodes**: Each node in the network is solar-powered, ensuring continuous operation even in remote areas without access to conventional power sources.
- **Automated Responses**: Upon detecting any changes or triggers from the sensors, the system automatically initiates responses such as email alerts, text alerts, and notifications to emergency responders.
- **Data Visualization**: The data collected from the sensor network can be viewed on a webpage created using Flask and HTML, providing real-time monitoring and visualization of environmental conditions.

## Usage

The Forest Defense System (FDS) continuously monitors the environment for any signs of wildfires. Users can access the web interface to view real-time data and receive alerts in case of any detected anomalies.

## Acknowledgments

We would like to acknowledge the following:

- Kyle Seaford for programming it
- Raspberry Pi Foundation for providing the hardware platform.
- Flask and HTML communities for providing tools for web development.
- Emergency responders and organizations for their collaboration and support.

## Contact

For any questions or inquiries related to this project, you can reach out to Kyle Seaford via email or GitHub.

## ToDo

### pi stuff 
- [x] integrate onto pi
- [ ] make pi work with all the sensors

#### sensors / stuff needed 
- [x] temperature sensor
- [ ] smoke sensor
- [ ] rain sensor
- [ ] visual camera
- [ ] solar-powered pi
- [ ] 3D printed box for the whole pi, find out which pole to use

### dashboard stuff
- [x] default load onto zone1 when zones are added / removed .  I DON'T KNOW WHY IT DOSE NOT DO THIS AND NOR DOSE ANY AI. probobly bc nonw of them are set as the default but idkkkkk
- [x] change the colors 
- [ ] display graphs 
- [x] change unit description to 'colors'
- [x] make it so only a set amount of colors can be chosen or just assign each unit a color e.g. unit1: Yellow. Then make it so the background for the color column is the unit's color 
- [ ] insted of typing colour, type the url for the unit, eg unit1 - yellow, url - http://127.0.0.1:5000/zone1/unit1

### improvements 
- [ ] improve ip geolocation because it sometimes thinks were in glasgow (we're not.)
- [ ] replace IP location with GPS data
- [ ] replace the temperature sensor with a temperature and humidity sensor
- [ ] improve weather API so it updates more (can't due to free API limit)
- [ ] insted of typing the urls for each unit, make it so it will just auto do it becasuse the url is going to be the same for all apart from the last numbers (after zone and unit) eg http://127.0.0.1:5000/zone1/unit1
- [ ] change the "FireGuard Pro - Forest Defense System (FDS)" on the info bar to the logo. (FDS\dashboard\static\imgs\name.png) - messed up the styles too much when i tried 
