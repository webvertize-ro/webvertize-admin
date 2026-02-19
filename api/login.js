import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;
  console.log('username: ', username);

  if (!username || !password)
    return res.status(400).json({ error: 'Missing credentials' });

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username !== adminUser)
    return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, adminPass);

  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ user: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });

  return res.status(200).json({ token });
}
