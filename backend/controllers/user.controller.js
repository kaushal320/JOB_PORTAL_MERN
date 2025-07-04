import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { email, fullname, password, phoneNumber, role } = req.body;

    if (!fullname || !phoneNumber || !password || !role || !email) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists.", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      fullname,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully.", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message, success: false });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password.", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid  password.", success: false });
    }
    //check role is correct or not
    if (role !== user.role) {
      return res
        .status(403)
        .json({ message: "Incorrect role.", success: false });
    }
    // Generate JWT token

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "kaushal123",
      { expiresIn: "1h" }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set token as cookie and send JSON response
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    return res
      .status(200)
      .json({ message: "Login successful.", success: true, token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized.", success: false });
    }

    const updateFields = {};

    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (bio) updateFields.bio = bio;
    if (skills) {
      updateFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Optionally handle profile image upload if needed
    if (file) {
      const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
        folder: "profile_pictures",
      });
      updateFields.profileImage = cloudinaryResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully.", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
