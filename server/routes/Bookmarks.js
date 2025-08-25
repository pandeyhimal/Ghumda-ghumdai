// routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET bookmarks for a user
router.get("/:id/bookmarks", protect, async (req, res) => {
  try {
    // Convert both IDs to string for comparison
    if (req.user._id.toString() !== req.params.id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.params.id).populate("bookmarks");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ bookmarks: user.bookmarks.map(b => b._id || b) });
  } catch (err) {
    console.error("GET bookmarks error:", err);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

// ADD a bookmark
router.post("/:id/bookmarks", protect, async (req, res) => {
  try {
    const { contentId } = req.body;

    console.log("Add bookmark request:");
    console.log("- User ID from token:", req.user._id.toString());
    console.log("- User ID from params:", req.params.id);
    console.log("- Content ID:", contentId);

    if (!contentId) {
      return res.status(400).json({ error: "Content ID is required" });
    }

    // Convert both IDs to string for comparison
    if (req.user._id.toString() !== req.params.id.toString()) {
      console.log("Authorization failed: IDs don't match");
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Current user bookmarks:", user.bookmarks);

    // Initialize bookmarks if undefined
    if (!Array.isArray(user.bookmarks)) {
      user.bookmarks = [];
    }

    // Check if bookmark already exists
    const bookmarkExists = user.bookmarks.some(bookmark => 
      bookmark.toString() === contentId.toString()
    );

    if (bookmarkExists) {
      console.log("Bookmark already exists");
      return res.json({ 
        bookmarks: user.bookmarks, 
        user: user,
        message: "Bookmark already exists"
      });
    }

    // Add the bookmark
    user.bookmarks.push(contentId);
    const savedUser = await user.save();
    
    console.log("Bookmark added successfully. New bookmarks:", savedUser.bookmarks);

    res.json({ 
      bookmarks: savedUser.bookmarks, 
      user: savedUser,
      message: "Bookmark added successfully"
    });

  } catch (err) {
    console.error("Add bookmark error:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      error: "Failed to add bookmark",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Delete a bookmark
router.delete("/:id/bookmarks/:contentId", protect, async (req, res) => {
  try {
    console.log("Delete bookmark request:");
    console.log("- User ID from token:", req.user._id.toString());
    console.log("- User ID from params:", req.params.id);
    console.log("- Content ID:", req.params.contentId);

    // Convert both IDs to string for comparison
    if (req.user._id.toString() !== req.params.id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Current bookmarks before deletion:", user.bookmarks);

    // Remove the bookmark
    const initialLength = user.bookmarks.length;
    user.bookmarks = user.bookmarks.filter(bookmark => 
      bookmark.toString() !== req.params.contentId.toString()
    );

    if (user.bookmarks.length === initialLength) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    const savedUser = await user.save();
    console.log("Bookmark removed successfully. New bookmarks:", savedUser.bookmarks);

    res.json({ 
      bookmarks: savedUser.bookmarks,
      user: savedUser,
      message: "Bookmark removed successfully"
    });

  } catch (err) {
    console.error("Delete bookmark error:", err);
    res.status(500).json({ error: "Failed to remove bookmark" });
  }
});

export default router;