const isAuthenticated = () => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("Not authorized");
      error.status = 401;
      return res.status(401).json({ error });
    }
    if (req.user && req.user.authenticated) return next();
    return next(undefined);
  };
};
export default isAuthenticated;