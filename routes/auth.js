const express = require("express");
const router = express.Router();
const db = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        mesage: "Incomplete information!"
      });
    }
    await db.addUser(req.body);
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Request requires email and password"
      });
    }
    const user = await db.getUserByEmail(email);
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (user && passwordMatches) {
      const token = await jwt.sign({ id: user.uid }, process.env.JWT_SECRET,{
          expiresIn: Date.now() + 900000
      });
      return res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000)
      }).json({
        token: token
      });
    } else {
      return res.status(404).json({
        message: "Your credentials are not valid!"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
