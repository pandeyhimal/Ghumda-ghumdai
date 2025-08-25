import express from "express";
import { protect, adminOnly } from "../middleware/AuthMiddleware.js";
import { makeAdmin } from "../controllers/AdminController.js";

const router = express.Router();

// Example admin-only route
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", user: req.user });
});

// Promote user -> Admin (only existing admins can do this)
router.put("/make-admin/:id", protect, adminOnly, makeAdmin);

export default router;
