from fastapi import FastAPI, WebSocket
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import pyaudio
import Python_Websocket_Server

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="")

@app.get("/")
async def main():
    return FileResponse('static/index.html')

@app.get("/chat/{name}")
async def chat(name: str):
    return FileResponse('static/JSWebsocketClient.html')  # New chat page

@app.websocket("/mic/{name}")
async def receive_connection(websocket: WebSocket, name: str):
    await websocket.accept()
    print(f"User {name} connected")
    p = pyaudio.PyAudio()
    player = p.open(format=pyaudio.paInt16, channels=1, rate=16000, output=True)
    while True:
        data = await websocket.receive_bytes()
        output = Python_Websocket_Server.decode_audio(data)
        player.write(output)
