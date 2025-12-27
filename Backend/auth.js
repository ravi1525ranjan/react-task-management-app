import jwt from 'jsonwebtoken'


export const generateToken = (user) => {
  return jwt.sign(user, 'practice123', { expiresIn: '1h' });
};


export const authenticateToken = (req, res, next) => {
  const authHeader = req.cookies['token'];
  // console.log("Auth Header:", authHeader);
  // const token = authHeader && authHeader.split(' ')[1];
  if (authHeader == null) return res.sendStatus(401);
    jwt.verify(authHeader, 'practice123', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
