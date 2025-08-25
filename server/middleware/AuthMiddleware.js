import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Verify JWT
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("No token found in headers");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Use _id consistently (MongoDB default field name)
    const user = await User.findById(decoded.id || decoded._id).select("-password");
    if (!user) {
      console.log("User not found for ID:", decoded.id || decoded._id);
      return res.status(401).json({ message: "User not found" });
    }

    console.log("Authenticated user:", {
      id: user._id,
      email: user.email,
      bookmarks: user.bookmarks?.length || 0
    });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Token is not valid" });
  }
};

// ✅ Check Role
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
};
