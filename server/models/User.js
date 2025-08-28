import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // only two roles
      default: "user",
    },
    // Changed to accept strings instead of ObjectIds since your content IDs are strings like "1", "2", etc.
    bookmarks: [
      {
        type: String, // Changed from mongoose.Schema.Types.ObjectId
        // Removed ref: "Content" since we're not using actual ObjectId references
      },
    ],
    // ✅ Fields for password reset
    resetOTP: { type: String },
    resetOTPExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
