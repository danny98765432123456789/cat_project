# cat_project
For IoT course  final project

 ![](https://i.imgur.com/w4VUtqv.png)

7697
=====
7697 with temp sensor, humidity sensor and OLED
It transmits the data through MQTT

Backend
=====
mqtt2db: Throw the data to the local database by getting from the MQTT broker
server: Run APIs and the call the frontend
locating: Get the locating data from the other the MQTT broker (LAB server), and throw to the same broker

Frontend
=====
Show the real time information and use the GET and POST methods
