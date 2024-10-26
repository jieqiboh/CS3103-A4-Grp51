from fastapi import FastAPI, WebSocket
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import pyaudio
import Python_Websocket_Server

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="")

@app.get("/")
async def main():
    return FileResponse('static/JSWebsocketClient.html')

@app.websocket("/mic")
async def receive_connection(websocket: WebSocket):
    await websocket.accept()
    p = pyaudio.PyAudio()
    player = p.open(format=pyaudio.paInt16, channels=1, rate=16000, output=True)
    while True:
        data = await websocket.receive_bytes()
        output = Python_Websocket_Server.decode_audio(data)
        player.write(output)
