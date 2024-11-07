# CS3103-A4-Grp51

Smart Push-to-Talk (PTT) Web Application for Real-Time Class Discussions using Websockets.

### Project Architecture

```
+------------+          +------------+
|  Client 1  | ........ |  Client n  |
|            |          |            |
+------------+          +------------+
        |                      |
        ------------------------
                   |
                   v
         +----------------------+
         |   WebSocket Server   |
         |                      |
         +----------------------+
```

### Installation

We recommend configuring a virtual environment for this project.
1. `cd` to the project root
2. `python3 -m venv venv`
3. `source venv/bin/activate`
4. In your IDE, configure the Python interpreter to use the virtual environment
5. For initial setup, do `pip install -r requirements.txt`

Running the server:
1. Connect the computer to a network/router. Then locate the public IP address of the computer
- If the computer runs a window OS, type “ipconfig” in the terminal and find the IPv4 address of “Wireless LAN adapter Wi-Fi:”
- If the computer runs a linux/unix OS, type “ifconfig” in the terminal and find the public IP address of the device
  
2. Go to chrome://flags/
   
4. Look for "Insecure origins treated as secure" and enable it
   
5. Add the ip address of the computer to the box and relaunch chrome. The reason for this is that our server does not use any certificate (i.e starts with http instead of https). Because of this, google chrome does not allow microphone to be enabled for unsecure webpage. This is to make google chrome “recognise” our webpage as secure
   
6. Locate the file JSWebsocketClient.js. The folder path is server > static. Go to line 35, which have this line of code:

---------> websocket = new WebSocket('ws://192.168.43.75:80/mic/' + name); <------------

Note that 192.168.43.75 is only for our side. It could be different IP address

7. Modify 192.168.43.75 to be the ip address of the computer

E.g
If my IP address is 192.158.41.2, it’ll be

---------> websocket = new WebSocket('ws://192.158.41.2:80/mic/' + name); <------------

8. Go to the folder containing the main.py file. This file should be in the server folder. Ensure the terminal’s path is this folder. 

E.g
<.../CS3103-A4-Grp51/server> 

9. Type into the terminal this command

---------> uvicorn main:app --host (IP of computer) --port 80 <------------

For e.g, if my IP address is 192.158.41.2, the command is

---------> uvicorn main:app --host 192.158.41.2 --port 80 <------------

You should be able to see this (note that the weblink will be different. It only appears as 0.0.0.0 on my device) at the bottom. Click on the link to access the webpage

=======================================================================
...
INFO:     Started server process [22084]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
=======================================================================

### References

[The Websocket Protocol - RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455#section-1.1)

[WebSocket - Wikipedia](https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,as%20RFC%206455%20in%202011.)

[WebSockets Crash Course - Youtube](https://www.youtube.com/watch?v=2Nt-ZrNP22A&ab_channel=HusseinNasser)
