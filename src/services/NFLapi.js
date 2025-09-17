// src/services/NFLapi.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sportsdata.io/v3/nfl",
  headers: {
    "Ocp-Apim-Subscription-Key": "8e82062845264f16912a10417066c465"
  }
});

export default api;
