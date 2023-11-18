const express = require('express');
const next = require('next');
const prisma = require('../prisma');
const authenticateTokenMiddleware = require('../src/app/api/middleware/auth');
const upload = require('../src/app/api/middleware/multerMiddleware');
const booksApi = require('../src/app/api/books'); 
const userApi = require('../src/app/api/user');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  // API endpoint for user
  server.get('/register', userApi.register);
  server.get('/login', userApi.login);

  // API endpoint for books
  server.get('/api/books', booksApi.getAllBook);
  server.post('/api/books', authenticateTokenMiddleware, upload.single('image'), booksApi.postBook);
  server.delete('/api/books', authenticateTokenMiddleware, booksApi.deleteBook);
  server.get('/api/books', booksApi.getAllBookbyId);
  server.put('/api/books', authenticateTokenMiddleware, booksApi.updateBook);


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});