const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PLEX_TOKEN = process.env.PLEX_TOKEN;
const PLEX_SERVER_URL = process.env.PLEX_SERVER_URL;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const LAST_WATCHED_FILE = path.join(__dirname, '../last_watched.json');  // Path to last_watched.json

async function getRecentWatched() {
  try {
    const response = await axios.get(`${PLEX_SERVER_URL}/status/sessions`, {
      headers: {
        'X-Plex-Token': PLEX_TOKEN,
      },
    });

    const sessions = response.data.MediaContainer.Video;
    if (sessions && sessions.length > 0) {
      return sessions[0]; // Assuming the most recent watched item is first
    }
  } catch (error) {
    console.error('Error fetching data from Plex:', error);
    return null;
  }
}

async function updateLastWatched() {
  const lastWatched = await getRecentWatched();
  if (!lastWatched) {
    console.log('No recent watch data found.');
    return;
  }

  // Read the current last watched from file
  let currentData = {};
  if (fs.existsSync(LAST_WATCHED_FILE)) {
    currentData = JSON.parse(fs.readFileSync(LAST_WATCHED_FILE, 'utf-8'));
  }

  // If the last watched item is different, update the file
  if (!currentData.title || currentData.title !== lastWatched.title) {
    currentData = {
      title: lastWatched.title,
      type: lastWatched.type,
      ratingKey: lastWatched.ratingKey,
      lastUpdated: new Date().toISOString(),
    };

    fs.writeFileSync(LAST_WATCHED_FILE, JSON.stringify(currentData, null, 2));  // Update the file with the new data
    console.log('Updated last_watched.json:', currentData);

    // Send a Discord notification
    await sendDiscordNotification(currentData);
  } else {
    console.log('No new watch history found.');
  }
}

async function sendDiscordNotification(data) {
  const message = {
    content: `New item watched: ${data.title} (${data.type})`,
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, message);
    console.log('Discord notification sent.');
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}

updateLastWatched();
