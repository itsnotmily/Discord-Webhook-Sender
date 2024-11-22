const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PLEX_TOKEN = process.env.PLEX_TOKEN;
const PLEX_SERVER_URL = process.env.PLEX_SERVER_URL;  // Example: 'http://localhost:32400'
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const LAST_WATCHED_FILE = path.join(__dirname, '../last_watched.json');  // Path to last_watched.json

// Replace <section_id> with the appropriate IDs for your library sections (Movies and TV Shows)
const MOVIE_SECTION_ID = '1';  // Usually '1' is Movies, but verify your library section ID
const TV_SECTION_ID = '2';  // Usually '2' is TV Shows, but verify your library section ID

// Fetch history for Movies and TV Shows
async function getLastWatched() {
  try {
    console.log('Fetching watch history from Plex...');
    
    // Fetch Movies
    const movieResponse = await axios.get(`${PLEX_SERVER_URL}/library/sections/${MOVIE_SECTION_ID}/all`, {
      headers: {
        'X-Plex-Token': PLEX_TOKEN,
      },
      params: {
        type: 1,  // 1 is for Movies
        sort: 'addedAt:desc', // Sort by most recently added or watched
      },
    });

    // Fetch TV Shows
    const tvResponse = await axios.get(`${PLEX_SERVER_URL}/library/sections/${TV_SECTION_ID}/all`, {
      headers: {
        'X-Plex-Token': PLEX_TOKEN,
      },
      params: {
        type: 2,  // 2 is for TV shows
        sort: 'addedAt:desc', // Sort by most recently added or watched
      },
    });

    // Combine both responses
    const movies = movieResponse.data.MediaContainer.Movie || [];
    const tvShows = tvResponse.data.MediaContainer.TVShow || [];

    const combined = [...movies, ...tvShows];  // Combine the movies and TV shows
    if (combined.length > 0) {
      // Sort by the most recently watched item
      combined.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt)); // Sort by added date
      return combined[0];  // Return the most recent watched item
    } else {
      console.log('No movies or TV shows found in history.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from Plex:', error);
    return null;
  }
}

// Update last watched
async function updateLastWatched() {
  const lastWatched = await getLastWatched();
  if (!lastWatched) {
    console.log('No recent watch data found.');
    return;
  }

  // Read the current last watched from file
  let currentData = {};
  if (fs.existsSync(LAST_WATCHED_FILE)) {
    currentData = JSON.parse(fs.readFileSync(LAST_WATCHED_FILE, 'utf-8'));
    console.log('Current last watched data:', currentData);  // Debug log for current data
  } else {
    console.log('last_watched.json does not exist, creating new file...');
  }

  // If the last watched item is different, update the file
  if (!currentData.title || currentData.title !== lastWatched.title) {
    currentData = {
      title: lastWatched.title,
      type: lastWatched.type === 1 ? 'movie' : 'tv_show',
      ratingKey: lastWatched.ratingKey,
      lastUpdated: new Date().toISOString(),
    };

    console.log('Writing new data to last_watched.json:', currentData);  // Debug log for new data

    fs.writeFileSync(LAST_WATCHED_FILE, JSON.stringify(currentData, null, 2));  // Update the file with the new data

    // Send a Discord notification
    await sendDiscordNotification(currentData);
  } else {
    console.log('No new watch history found.');
  }
}

// Send a Discord notification
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

// Call the update function
updateLastWatched();
