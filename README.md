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
1. `cd server/`
2. `uvicorn main:app --host 0.0.0.0 --port 80`
3. Navigate to your browser, and go to `http://localhost:80/`
   (Enable the microphone permissions for the site)

### References

[The Websocket Protocol - RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455#section-1.1)

[WebSocket - Wikipedia](https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,as%20RFC%206455%20in%202011.)

[WebSockets Crash Course - Youtube](https://www.youtube.com/watch?v=2Nt-ZrNP22A&ab_channel=HusseinNasser)
