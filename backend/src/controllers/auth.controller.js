import { generateToken } from "../lib/utils.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";



export const register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(user, res);

    // Remove password by re-querying the user via Mongoose (exclude password)
    // const userWithoutPassword = await User.findById(user._id).select("-password");
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { FullName, profilePicture } = req.body;
    const userId = req.user._id;

    // Prepare update object
    const updateData = {};

    if (FullName) {
      updateData.FullName = FullName;
    }

    if (profilePicture) {
      // Only upload image if provided
      const uploadResult = await cloudinary.uploader.upload(profilePicture);
      updateData.profilePicture = uploadResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
