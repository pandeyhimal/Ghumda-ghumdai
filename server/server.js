import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/Auth.js";
import adminRoutes from "./routes/Admin.js";
import bookmark from "./routes/Bookmarks.js";

dotenv.config();
const app = express();

// ✅ Connect Database
connectDB();

// ✅ Enable CORS
// app.use(cors({
//   origin: "http://localhost:6000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

const allowedOrigins = ["http://localhost:8080", "http://localhost:6000"];
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

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", bookmark);

// Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
