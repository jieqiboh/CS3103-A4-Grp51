# Python Websocket Server Sample
# Author: Bhojan Anand, NUS SoC
 
# import asyncio
# import websockets
# import pyaudio
import ffmpeg

# Setup PyAudio for real-time audio playback
# p = pyaudio.PyAudio()
# stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, output=True)

# Function to decode WebM/OGG audio using ffmpeg
def decode_audio(data):
    process = (
        ffmpeg
        .input('pipe:', format='webm')  # or 'ogg', depending on the client's format
        .output('pipe:', format='wav', acodec='pcm_s16le', ac=1, ar='16000')  # Decode to PCM
        .run_async(pipe_stdin=True, pipe_stdout=True, pipe_stderr=True)
    )
    output, _ = process.communicate(input=data)
    return output

# Handle the WebSocket connection
# async def handle_client(websocket, path):
#     try:
#         async for audio_data in websocket:
#             decoded_audio = decode_audio(audio_data)
#             stream.write(decoded_audio)  # Play the audio in real-time
#     except websockets.exceptions.ConnectionClosed:
#         print("Client disconnected")

# Start WebSocket server
# start_server = websockets.serve(handle_client, "0.0.0.0", 8000)
# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()