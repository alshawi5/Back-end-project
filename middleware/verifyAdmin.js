const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ err: 'Access denied: Admins only' });
  }
  next();
};
// i added this to check the token for admin 
module.exports = verifyAdmin; 
