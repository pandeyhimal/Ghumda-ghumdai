import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/Auth.js";
import adminRoutes from "./routes/Admin.js";
import bookmark from "./routes/Bookmarks.js";
import contentRoutes from "./routes/ContentRoutes.js";
import resetPassword from "./routes/PasswordResetroute.js";
import path from "path";
import passport from "passport";
import "./config/passport.js";

dotenv.config();
const app = express();
app.use(passport.initialize());

// ✅ Connect Database
connectDB();

// ✅ Enable CORS
// app.use(cors({
//   origin: "http://localhost:6000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:6000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5000"
];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
// Serve static uploads (for any locally stored files)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", resetPassword);
app.use("/api/users", bookmark);
app.use("/api/content", contentRoutes);

// Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// app._router.stack.forEach((r) => {
//   if (r.route && r.route.path) {
//     console.log("Route:", r.route.path);
//   }
// });
