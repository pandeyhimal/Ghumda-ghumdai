import express from "express";
import { protect, adminOnly } from "../middleware/AuthMiddleware.js";
import { makeAdmin, listUsers, setUserRole, listAllContent, reviewContent } from "../controllers/AdminController.js";

const router = express.Router();

// Example admin-only route
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", user: req.user });
});

// Promote user -> Admin (only existing admins can do this)
router.put("/make-admin/:id", protect, adminOnly, makeAdmin);

// RBAC management
router.get("/users", protect, adminOnly, listUsers);
router.put("/users/:id/role", protect, adminOnly, setUserRole);

// Content moderation
router.get("/content", protect, adminOnly, listAllContent);
router.post("/content/:id/review", protect, adminOnly, reviewContent);

export default router;
