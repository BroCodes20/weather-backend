const express = require("express");
const axios = require("axios");
require("dotenv").config;
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({
      error: "Latitude and Longitude are required",
    });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: process.env.WEATHER_API_KEY,
        },
      }
    );

    const data = response.data;
    res.json({
      temp: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});
