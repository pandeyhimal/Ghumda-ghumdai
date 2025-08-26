import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    fullDescription: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["places", "food", "traditions"],
      required: true,
    },
    province: { type: String },
    district: { type: String, required: true },
    municipality: { type: String, required: true },
    ward: { type: String },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    location: { type: LocationSchema, required: false },
    tips: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    bestTime: { type: String },
    price: { type: String },
    difficulty: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Content", ContentSchema);
