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



References:

[The Websocket Protocol - RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455#section-1.1)

[WebSocket - Wikipedia](https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,as%20RFC%206455%20in%202011.)

[WebSockets Crash Course - Youtube](https://www.youtube.com/watch?v=2Nt-ZrNP22A&ab_channel=HusseinNasser)
