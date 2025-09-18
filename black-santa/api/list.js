const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'black.json');

function readData() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(filePath));
}

export default async function handler(req, res) {
  const data = readData();
  res.status(200).json(data);
}
