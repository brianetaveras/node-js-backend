const jwt = require("jsonwebtoken");
const db = require("../models/user-model");
module.exports = function verifyUsersAuth() {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.redirect("/login");
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await db.getUserById(decoded.id);

      if (user) {
        req.user = user;
        next();
      }
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.redirect("/login");
      }
      throw err;
    }
  };
};
