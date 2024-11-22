const fs = require('fs');
const path = require('path');

// Path to the last_watched.json file
const filePath = path.resolve(__dirname, '../last_watched.json');

// Read and parse the JSON file
let data;
try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContent);
} catch (error) {
    console.error('Error reading or parsing last_watched.json:', error);
    process.exit(1);
}

// Ensure the JSON has a 'count' key and increment it
if (typeof data.count !== 'number') {
    data.count = 0; // Initialize count if it doesn't exist
}
data.count += 1;

// Write the updated JSON back to the file
try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully incremented count to:', data.count);
} catch (error) {
    console.error('Error writing to last_watched.json:', error);
    process.exit(1);
}
