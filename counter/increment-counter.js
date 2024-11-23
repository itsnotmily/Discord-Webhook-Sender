const fs = require('fs');

const filePath = './counter/last_watched.json';
const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : { count: 0 };

data.count = (data.count || 0) + 1;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated count to:', data.count);
