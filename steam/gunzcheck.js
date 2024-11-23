const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Constants
const appId = 3139440; // GunZ app ID
const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
const outputFilePath = path.join(__dirname, 'last_gunz.json');

// Function to fetch GunZ status
async function checkGunZStatus() {
  try {
    // Fetch data from Steam API
    const response = await axios.get(apiUrl);
    
    // Log the full response to see if it's valid
    console.log('Raw API Response:', response.data);
    
    // Check if the response has valid data for the given appId
    const appData = response.data[appId];

    if (!appData || !appData.success) {
      console.error('Failed to fetch valid game details or app data is not successful.');
      return;
    }

    // Extract release details
    const releaseDate = appData.data.release_date;
    const releaseStatus = releaseDate.coming_soon
      ? 'Coming Soon'
      : releaseDate.date
      ? `Released or Scheduled: ${releaseDate.date}`
      : 'To Be Announced';

    const newData = {
      appId,
      name: appData.data.name,
      releaseStatus,
      lastChecked: new Date().toISOString(),
    };

    // Load existing data if it exists
    let existingData = null;
    if (fs.existsSync(outputFilePath)) {
      try {
        existingData = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
      } catch (error) {
        console.error('Error reading existing JSON file:', error.message);
      }
    }

    // Compare new data with existing data
    if (!existingData || JSON.stringify(newData) !== JSON.stringify(existingData)) {
      // Log the changes
      console.log('Changes detected!');

      // Output the differences between the old and new data
      console.log('Previous Status:', existingData ? existingData.releaseStatus : 'N/A');
      console.log('Current Status:', newData.releaseStatus);
    } else {
      console.log('No changes detected.');
    }

    // Update the JSON file with the new data
    try {
      fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2), 'utf8');
      console.log('Game status updated locally.');
    } catch (error) {
      console.error('Error writing to file:', error.message);
    }
  } catch (error) {
    console.error('Error checking GunZ status:', error.message);
  }
}

// Run the function
checkGunZStatus();
