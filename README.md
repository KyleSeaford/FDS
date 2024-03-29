# Forest Defence System (FDS)
Welcome to the Forest Defence System (FDS) repository, a system designed for early detection and prevention of wildfires in remote and forested areas.

## Overview

The Forest Defence System (FDS) utilizes a network of sensors connected to Raspberry Pis to detect various environmental conditions such as smoke, temperature changes, rain as well as visual monitoring through cameras. These sensors continuously monitor the area for any signs of fire or smoke.

## Features

- **Sensor Network**: Utilizes a network of sensors including smoke detectors, temperature sensors, rain sensors and cameras.
- **Solar-Powered Nodes**: Each node in the network is solar-powered, ensuring continuous operation even in remote areas without access to conventional power sources.
- **Automated Responses**: Upon detecting any changes or triggers from the sensors, the system automatically initiates responses such as email alerts, text alerts, and notifications to emergency responders.
- **Data Visualization**: The data collected from the sensor network can be viewed on a webpage created using Flask and HTML, providing real-time monitoring and visualization of environmental conditions.

## Usage

The Forest Defencen System (FDS) continuously monitors the environment for any signs of wildfires. Users can access the web interface to view real-time data and receive alerts in case of any detected anomalies.

## Acknowledgments

We would like to acknowledge the following:

- Kyle Seaford for programming it
- Raspberry Pi Foundation for providing the hardware platform.
- Flask and HTML communities for providing tools for web development.
- Emergency responders and organizations for their collaboration and support.

## Contact

For any questions or inquiries related to this project, you can reach out to Kyle Seaford via email or GitHub.

## ToDo
- [ ] intergrate onto pi
- [ ] make pi work with all the sensors
- [ ] show pis data on dashboard
- [ ] make zones more intresting

## sensors / stuff needed 
- [x] temperature sensor
- [ ] smoke sensor
- [ ] rain sensor
- [ ] visual camera
- [ ] solar powerd pi
- [ ] 3d printed box for whole pi, find out what pole to use

## improvements 
- [ ] replace ip location with gps data
- [ ] repace the tempeture sensor with a tempeture and humdity sensor
- [ ] improve weather api so it updates more (cant due to free api limit)
