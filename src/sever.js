const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

// Route to handle the lyrics request
app.get('/api/lyrics', async (req, res) => {
  const { songName, artistName } = req.query;

  try {
    const response = await axios.get('https://api.genius.com/search', {
      params: {
        q: `${songName} ${artistName}`
      },
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).send("Error fetching lyrics");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
