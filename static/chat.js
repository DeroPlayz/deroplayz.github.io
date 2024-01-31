var socket = io();
var inmsg = document.getElementById("in-msg");
var port = document.getElementById("in-port");

socket.on('incoming message', function(data) { // When a new message comes in...
    var newMsgNode = document.createElement("P"); // Make a text thing
    newMsgNode.textContent = data; // Put the message in the thing
    document.getElementById("messages").appendChild(newMsgNode); // Show the thing in the right place
});
/*const fs = require("fs");
const log = "history.txt";

socket.emit("outgoing message", data);
socket.emit("outgoing message", readFile(log));
*/


let dateObject = new Date();
console.log("A date object is defined")

let date = ("0" + dateObject.getDate()).slice(-2);
let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
let year = dateObject.getFullYear();

let hours = dateObject.getHours();
let minutes = dateObject.getMinutes();
let seconds = dateObject.getSeconds();

inmsg.addEventListener("keydown", function() {
    //console.log(msg.length);
    if (event.keyCode === 13) { // When user hits the enter key...
        event.preventDefault();
        if (inmsg.value == "") // Yeet outta there if the message is empty
            return;
        var msg = inmsg.value;
        //Censor
        let censorList = "shit fuck bitch cunt dick pussy ass whore hoe slut cum kum $hit sh!t $h!t fuc fvk fvck fvc fuk fck cnt bich bish b!tch d!ck dck weiner"
        console.log(msg);
        console.log(censorList);
        if (censorList.includes(msg.toLowerCase()) == false) {
            if (msg.length < 200) {
                socket.emit('outgoing message', date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + "\t | " + localStorage.getItem("name") + ": " + msg); // Broadcast message to server for handling
            }
            inmsg.value = ""; // Clear message box
        }
    }
});