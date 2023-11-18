import prisma from '../../../lib/prisma';


export const deleteBook = async function handler(req, res) {
  if (req.method === 'DELETE') {
    // Handle authentication middleware
     (req, res, async () => {
      try {
        const { id } = req.query;
        const book = await prisma.book.delete({
          where: { id: Number(id) },
        });

        res.json({ book });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}