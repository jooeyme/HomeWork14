import prisma from '../../../lib/prisma';


export const postBook = async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle authentication middleware
     (req, res, async () => {
      try {
        const { title, author, publisher, year, pages } = req.body;
        const book = await prisma.book.create({
          data: {
            title,
            author,
            publisher,
            year: parseInt(year),
            pages: parseInt(pages),
            image: req.file.path, // add the path to the uploaded image to the book data
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