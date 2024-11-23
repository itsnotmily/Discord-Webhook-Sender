const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Constants
const API_URL = 'YOUR_API_URL_HERE'; // Replace with your API endpoint
const OUTPUT_FILE = path.join(__dirname, 'last_status.json'); // Path for saving status
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL; // Discord Webhook URL from environment variable

/**
 * [1] Fetch Data from API
 * Replace this with logic to fetch data from your API endpoint
 */
async function fetchData() {
  try {
    const response = await axios.get(API_URL);
    console.log('Raw API Response:', response.data); // Log for debugging
    return response.data; // Return the raw API response
  } catch (error) {
    console.error('Error fetching API data:', error.message);
    return null;
  }
}

/**
 * [2] Process API Response
 * Define how to extract and structure relevant data from the raw API response
 */
function processApiResponse(apiData) {
  // Replace with logic to parse and structure data
  if (!apiData) {
    console.error('Invalid API response.');
    return null;
  }

  return {
    // Example structure
    keyField: apiData.keyField || 'Unknown', // Replace with real fields
    status: apiData.status || 'Unknown', // Replace with real fields
    lastChecked: new Date().toISOString(),
  };
}

/**
 * Prepare a Generic Discord Notification Payload
 * This function generates a generic notification structure for Discord.
 */
function prepareDiscordPayload() {
  return {
    content: `🔔 **Notification:**`, // Generic notification content
    embeds: [
      {
        title: 'Generic Notification', // Replace with your desired title
        description: 'This is a generic notification template.', // Replace with your desired description
        fields: [
          { name: 'Field 1', value: 'Value 1', inline: true }, // Replace or duplicate as needed
          { name: 'Field 2', value: 'Value 2', inline: true }, // Replace or remove
        ],
        color: 0x00ff00, // Default color (green) - change if needed
        timestamp: new Date().toISOString(), // Always include the timestamp
      },
    ],
  };
}


/**
 * [4] Send Notification to Discord
 */
async function sendDiscordNotification(payload) {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, payload);
    console.log('Discord notification sent successfully!');
  } catch (error) {
    console.error('Error sending Discord notification:', error.message);
  }
}

/**
 * [5] Save Data Locally
 */
function saveData(newData) {
  try {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newData, null, 2), 'utf8');
    console.log('Status saved locally.');
  } catch (error) {
    console.error('Error writing to file:', error.message);
  }
}

/**
 * Main Function
 * Orchestrates the workflow: Fetch -> Process -> Notify -> Save
 */
async function checkStatus() {
  // Fetch data from the API
  const apiData = await fetchData();

  // Process the raw API response
  const newData = processApiResponse(apiData);
  if (!newData) return; // Exit if processing failed

  // Prepare and send a notification to Discord
  const discordPayload = prepareDiscordPayload(newData);
  await sendDiscordNotification(discordPayload);

  // Save the new data to the local file
  saveData(newData);
}

// Run the main function
checkStatus();
