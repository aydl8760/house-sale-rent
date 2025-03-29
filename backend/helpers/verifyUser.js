import jwt from "jsonwebtoken";

export const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(err);

    req.user = user;
    next();
  });
};
