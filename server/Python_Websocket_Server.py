# Python Websocket Server Sample
# Author: Bhojan Anand, NUS SoC
 
import ffmpeg

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