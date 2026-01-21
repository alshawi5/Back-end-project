const verifyAdmin = (req, res, next) => {
  // req.user comes from verifyToken middleware
  if (req.user.role !== 'admin') {
    return res.status(403).json({ err: 'Access denied: Admins only' });
  }
  next();
};

module.exports = verifyAdmin;
