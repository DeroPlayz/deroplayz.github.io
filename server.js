const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs').promises;

app.use(express.static('.')); // Serve static files from the current directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/convert', async (req, res) => {
    try {
        const url = req.body.url;
        const response = await axios.get(url);
        const htmlContent = response.data;

        // Save the HTML content to a text file
        await fs.writeFile('output.txt', htmlContent);

        res.send('The HTML has been saved to output.txt');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

const PORT = process.env.PORT ||  3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
