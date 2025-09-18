const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'black.json');

function readData() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'الطريقة غير مسموح بها' });
  }

  const { link } = req.body;
  const data = readData();
  data.push({ link });
  writeData(data);
  res.status(200).json({ success: true });
}
