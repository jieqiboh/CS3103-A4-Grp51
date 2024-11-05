from fastapi import FastAPI, WebSocket
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from collections import deque
import pyaudio
from typing import Dict
from datetime import datetime

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="")

active_connections: Dict[str, dict] = {}
current_speaker = [None]

@app.get("/")
async def main():
    return FileResponse('static/index.html')

@app.get("/chat/{name}")
async def chat(name: str):
    return FileResponse('static/JSWebsocketClient.html')

@app.get("/admin")
async def admin():
    return FileResponse('static/admin.html')

@app.get("/api/connections")
async def get_connections():
    return {
        "connections": [
            {
                "name": name,
                "connected_at": info["connected_at"].isoformat(),
                "duration": (datetime.now() - info["connected_at"]).seconds
            }
            for name, info in active_connections.items()
        ],
        "total": len(active_connections)
    }

@app.websocket("/mic/{name}")
async def receive_connection(websocket: WebSocket, name: str):
    await websocket.accept()
    active_connections[name] = {"websocket": websocket, "connected_at": datetime.now()}
    print(f"User {name} connected")
    try:
        p = pyaudio.PyAudio()
        player = p.open(format=pyaudio.paInt16, channels=1, rate=16000, output=True)
        while True:
            data = await websocket.receive_bytes()
            try:
                data.decode()
                current_speaker[0] = None
            except:
                if not current_speaker[0]:
                    current_speaker[0] = name
                if current_speaker[0] == name:
                    print(name)
                    player.write(data)
    finally:
        if name in active_connections:
            del active_connections[name]
        print(f"User {name} disconnected")