import type { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const databaseUrl = process.env.DATABASE_URL;
  res.status(200).json({ databaseUrl });
}
