import User from "../models/User.js";
import Content from "../models/ContentModel.js";

export const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({ message: `${user.fullName} is now an Admin` });
  } catch (error) {
    console.error("MakeAdmin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listUsers = async (_req, res) => {
  try {
    const users = await User.find({}).select("fullName email role createdAt").lean();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Failed to list users" });
  }
};

export const setUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body || {};
    if (!role || !["user", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("fullName email role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Failed to update role" });
  }
};

export const listAllContent = async (req, res) => {
  try {
    const { status } = req.query || {};
    const query = {};
    if (status && ["pending", "approved", "rejected"].includes(status)) query.status = status;
    const items = await Content.find(query)
      .populate({ path: "author", select: "fullName email" })
      .sort({ createdAt: -1 })
      .lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Failed to list content" });
  }
};

export const reviewContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body || {};
    if (!action) return res.status(400).json({ message: "Action required" });
    const status = action === "approve" ? "approved" : "rejected";
    const item = await Content.findByIdAndUpdate(id, { status }, { new: true })
      .populate({ path: "author", select: "fullName email" });
    if (!item) return res.status(404).json({ message: "Content not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Failed to review content" });
  }
};
