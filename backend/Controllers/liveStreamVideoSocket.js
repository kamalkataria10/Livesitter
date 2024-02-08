const stream = require('node-rtsp-stream');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');  
const cors = require('cors');  
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });  

const { addVideoChunk } = require('./liveVideoChunksController');
app.use(cors());

async function initLiveStream() {
  try {
    const streamObj = new stream({
      name: 'wowza',
      streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
      wsPort: 9999,
      width: 240,
      height: 160,
      ffmpegOptions: {
        '-stats': '',
        '-r': '30'
      }
    });

    // Handle client connections
    wss.on('connection', (ws) => {
      console.log('Client connected');
      
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });


    // Handle stream data
    streamObj.on('data', async (data) => {
      console.log('Received video data:', data);
      // Broadcast data to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'live-stream', data }));
        }
      });
      try {
        await addVideoChunk({ data });
      } catch (error) {
        console.error('Error saving video chunk to the database:', error);
        
        // Broadcast error to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'error', error: error.message }));
          }
        });
      }
    });

    // Handle stream errors
    streamObj.on('error', (error) => {
      console.error('RTSP stream error:', error);

      // Broadcast error to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'error', error: error.message }));
        }
      });
    });

    // Gracefully stop the stream and server on process exit
    process.on('SIGINT', () => {
      streamObj.stop();
      server.close(() => {
        console.log('Server and stream stopped gracefully');
        process.exit(0);
      });
    });

    // Start the server
    server.listen(3000, () => {
      console.log('Live Server listening on port 3000');
    });

  } catch (error) {
    console.error('Error initializing RTSP stream:', error);
  }
}

module.exports = initLiveStream;
