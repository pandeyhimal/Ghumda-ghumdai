import express from "express";
import { signup, login } from "../controllers/AuthController.js";
import passport from "passport";   
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`http://localhost:3000/social-login?token=${token}`);
});

// GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`http://localhost:3000/social-login?token=${token}`);
});

// Facebook
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`http://localhost:3000/social-login?token=${token}`);
});


router.post("/register", signup);
router.post("/login", login);

export default router;
