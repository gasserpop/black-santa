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
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'الطريقة غير مسموح بها' });
  }

  const { link } = req.body;
  let data = readData();
  const index = data.findIndex(item => item.link === link);
  if (index !== -1) {
    data.splice(index, 1);
    writeData(data);
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'الرابط غير موجود' });
  }
}
