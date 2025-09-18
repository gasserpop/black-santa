let visits = 0;

export default async function handler(req, res) {
  visits++;
  res.status(200).json({ count: visits });
}
