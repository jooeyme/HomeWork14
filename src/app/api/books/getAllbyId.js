import prisma from '../../../lib/prisma';

export const getAllBookbyId = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const book = await prisma.book.findUnique({
        where: { id: Number(id) },
      });

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.json({ book });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}