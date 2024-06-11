// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.message });
    }
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
