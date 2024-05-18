// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Authentication
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById('auth').style.display = 'none';
            document.getElementById('confirmation').style.display = 'block';
        })
        .catch((error) => {
            console.error('Error logging in: ', error);
        });
});

// Confirmation Form Submission
document.getElementById('confirmation-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;

    db.collection('confirmations').add({
        name: name,
        status: status,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        document.getElementById('response').innerHTML = `<p>Thank you, ${name}! Your response (${status}) has been recorded.</p>`;
        document.getElementById('confirmation-form').reset();
    })
    .catch((error) => {
        console.error('Error adding confirmation: ', error);
    });
});