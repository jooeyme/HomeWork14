import prisma from '../../../lib/prisma';

export const updateBook = async function handler(req, res) {
  if (req.method === 'PUT') {
   
    (req, res, async () => {
      try {
        const { id } = req.query;
        const { title, author, publisher, year, pages } = req.body;
        const book = await prisma.book.update({
          where: { id: Number(id) },
          data: {
            title,
            author,
            publisher,
            year,
            pages,
          },
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