const chatbox = document.getElementById('chatbox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

// Create a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:8765');

// Connection opened
socket.addEventListener('open', (event) => {
    console.log('Connection opened');
});

// Listen for messages
socket.addEventListener('message', (event) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = event.data;
    chatbox.appendChild(messageElement);
});

// Send a message when the form is submitted
messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = ''; // Clear the input field
});

// Connection closed
socket.addEventListener('close', (event) => {
    console.log('Connection closed');
});
