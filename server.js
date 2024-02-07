const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port:  8080 });

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
      if (err) throw err;
    });
  });

  // Handle disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server started on port  8080');
