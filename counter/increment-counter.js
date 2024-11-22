const axios = require('axios');

const PLEX_SERVER_URL = "http://<YOUR_SERVER_URL>:32400"; // Replace with your server URL
const PLEX_TOKEN = "<YOUR_PLEX_TOKEN>"; // Replace with your token

async function getLatestWatched() {
  try {
    const response = await axios.get(`${PLEX_SERVER_URL}/status/sessions/history/all`, {
      params: { 'X-Plex-Token': PLEX_TOKEN }
    });

    const history = response.data.MediaContainer.Metadata;

    if (history && history.length > 0) {
      // Sort by view date (descending)
      history.sort((a, b) => b.lastViewedAt - a.lastViewedAt);

      const latest = history[0];
      console.log(`Latest Watched: ${latest.title}`);
    } else {
      console.log('No watch history found.');
    }
  } catch (error) {
    console.error('Error fetching watch history:', error.message);
  }
}

getLatestWatched();
