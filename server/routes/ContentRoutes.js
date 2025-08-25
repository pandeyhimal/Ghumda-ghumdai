// routes/contentRoutes.ts
import express from "express";
import { verifyToken } from "../middleware/auth"; 
import Content from "../models/Content";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // token bata aako
    const newContent = new Content({
      ...req.body,
      author: userId,  // automatic fill
    });
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: "Failed to add content", error });
  }
});

export default router;
