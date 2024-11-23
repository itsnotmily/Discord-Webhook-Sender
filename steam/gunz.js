const axios = require('axios');
const fs = require('fs');
const path = require('path');

const appId = 3139440; // GunZ app ID
const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
const outputFilePath = path.join(__dirname, 'last_gunz.json');

async function checkGunZStatus() {
  try {
    // Fetch data from the Steam API
    const response = await axios.get(apiUrl);
    const appData = response.data[appId];

    if (!appData.success) {
      console.error('Failed to fetch game details.');
      return;
    }

    // Extract release details
    const releaseDate = appData.data.release_date;
    const releaseStatus = releaseDate.coming_soon
      ? 'Coming Soon'
      : releaseDate.date
      ? `Released or Scheduled: ${releaseDate.date}`
      : 'To Be Announced';

    // Create data object to store
    const dataToStore = {
      appId,
      name: appData.data.name,
      releaseStatus,
      lastChecked: new Date().toISOString(),
    };

    // Write to last_gunz.json
    fs.writeFileSync(outputFilePath, JSON.stringify(dataToStore, null, 2), 'utf8');
    console.log(`Game status updated: ${JSON.stringify(dataToStore, null, 2)}`);
  } catch (error) {
    console.error('Error checking GunZ status:', error.message);
  }
}

// Run the function
checkGunZStatus();
