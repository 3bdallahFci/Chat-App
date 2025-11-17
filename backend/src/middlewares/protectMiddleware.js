import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const protectMiddleware = async (req, res, next) => {
  try {
    // Middleware logic to protect routes
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized- No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized- User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error);
    res.status(401).json({ message: "Unauthorized- Invalid token" });
  }
};
