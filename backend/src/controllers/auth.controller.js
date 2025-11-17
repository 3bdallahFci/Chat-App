import { generateToken } from "../lib/utils.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { FullName, email, password, } = req.body;

    if (!FullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      FullName,
      email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture || "",
    });
    
    if (newUser) {
        generateToken(newUser, res);
        res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
    
    await newUser.save();
    
  } catch (error) {
    log.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = (req, res) => {
  // Handle login
  res.send("Login route");
};

export const logout = (req, res) => {
  // Handle logout
  res.send("logout route");
};
