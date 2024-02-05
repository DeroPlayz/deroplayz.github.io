const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// Configure Pug as the view engine
app.set('view engine', 'pug');

// Parse POST request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static('public'));

// Route to display the form
app.get('/', (req, res) => {
  res.render('index');
});

// Route to fetch and display the content
app.post('/fetch-content', async (req, res) => {
  const url = req.body.url;
   
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.render('result', { content: data });
  } catch (error) {
    res.status(500).send(`Error fetching content: ${error.message}`);
  }
});

// Start the server
const PORT = process.env.PORT ||  3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));