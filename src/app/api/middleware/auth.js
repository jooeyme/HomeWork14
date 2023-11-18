import jwt from 'jsonwebtoken';

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(403); // Forbidden if token is invalid
  }
}

export default authenticateTokenMiddleware;