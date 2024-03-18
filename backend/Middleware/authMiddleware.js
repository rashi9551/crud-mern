const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token = req.query.token || req.body.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById({ _id: decoded.userId }).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, no token" });
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
