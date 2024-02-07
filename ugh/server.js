const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Ensure the directory for the chat history file exists
const dirPath = path.dirname('./chat_history.txt');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Create a WebSocket server
const wss = new WebSocket.Server({ port:   8080 });

// Handle new connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    // Save the message to a text file
    fs.appendFile('chat_history.txt', `${message}\n`, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Message saved to chat_history.txt');
      }
    });
  });

  // Handle disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server started on port   8080');