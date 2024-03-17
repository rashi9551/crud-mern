const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
   const {token}=req.query
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById({ _id: decoded.userId }).select(
        "-password"
      ); //you can get this logged in user globally and can perform actions with the user :) , ps: .select(-password) to avoid fetching password
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
