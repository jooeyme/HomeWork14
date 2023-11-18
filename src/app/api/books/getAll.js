import prisma from '../../../prisma';

export const getAllBook = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const books = await prisma.book.findMany();
      res.json({ books });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}