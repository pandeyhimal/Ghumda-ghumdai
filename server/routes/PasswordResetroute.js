import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Step 1: Request OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Password Reset OTP",
    //   text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    // });

    await transporter.sendMail({
      from: `"Ghumda Ghumdai Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Ghumda-Ghumdai Password",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
      <!-- Header -->
      <div style="background-color: #3b82f6; color: white; padding: 1.25rem; text-align: center;">
        <h1 style="margin: 0; font-size: 1.5rem; font-weight: 700;">Ghumda Ghumdai</h1>
        <p style="margin: 0; font-size: 0.875rem;">Password Reset Request</p>
      </div>

      <!-- Body -->
      <div style="padding: 1.875rem; color: #1f2937;">
        <p style="margin-bottom: 0.75rem;">Hi ${user.fullName || ""},</p>
        <p style="margin-bottom: 1.25rem;">We received a request to reset your password for your <strong>Ghumda ghumdai</strong> account.</p>

        <!-- OTP Button -->
        <p style="margin: 1.25rem 0; text-align: center;">
          <a href="http://localhost:5173/reset-password?email=${encodeURIComponent(
            email
          )}&otp=${otp}"
             style="
               display: inline-block;
               padding: 0.75rem 1.5rem;
               font-size: 1.125rem;
               color: white;
               background-color: #3b82f6;
               border-radius: 0.375rem;
               font-weight: 700;
               text-decoration: none;
               min-width: 160px;
             ">
            ${otp}
          </a>
        </p>

        <p style="margin-bottom: 1.25rem;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p style="margin-bottom: 0.75rem;">If you did not request a password reset, please ignore this email or contact support immediately.</p>

        <p style="margin-top: 1.875rem; font-size: 0.875rem; color: #6b7280;">Thank you,<br/>Ghumda Ghumdai Support Team</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 0.75rem; text-align: center; font-size: 0.75rem; color: #9ca3af;">
        © ${new Date().getFullYear()} Ghumda Ghumdai. All rights reserved.<br/>
        <a href="https://www.ghumdaghumdai.com" style="color: #3b82f6; text-decoration: none;">www.ghumdaghumdai.com</a>
      </div>
    </div>

    <!-- Responsive -->
    <style>
      @media only screen and (max-width: 600px) {
        div[style*='max-width: 600px'] {
          width: 95% !important;
        }
        a[style*='min-width: 160px'] {
          width: 100% !important;
          box-sizing: border-box;
        }
      }
    </style>
  `,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Step 2: Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOTP !== otp || user.resetOTPExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Step 3: Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOTP !== otp || user.resetOTPExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
