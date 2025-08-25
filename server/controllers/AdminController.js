import User from "../models/User.js";

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
