import bcrypt from 'bcrypt';
import prisma from '../../../prisma';

export const register = async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { password: passwordDB, ...user } = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.json({ user });
    } catch (err) {
      res.status(400).json({ message: 'User already exists' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}