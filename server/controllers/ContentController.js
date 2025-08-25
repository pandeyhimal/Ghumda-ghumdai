import Content from "../models/ContentModel.js";
import cloudinary from "../config/cloudinary.js";

export const createContent = async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      category,
      province,
      district,
      municipality,
      ward,
      image,
      images,
      tags,
      rating,
      reviewCount,
      tips,
      bestTime,
      price,
      difficulty,
    } = req.body;

    if (!title || !description || !fullDescription || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (ward && (Number.isNaN(Number(ward)) || Number(ward) < 1 || Number(ward) > 12)) {
      return res.status(400).json({ message: "Ward must be a number between 1 and 12" });
    }

    if (price && Number.isNaN(Number(price))) {
      return res.status(400).json({ message: "Price must be numeric" });
    }

    const content = new Content({
      title,
      description,
      fullDescription,
      category,
      province,
      district,
      municipality,
      ward,
      image,
      images,
      tags,
      rating,
      reviewCount,
      tips,
      bestTime,
      price,
      difficulty,
      author: req.user?._id,
    });

    const saved = await content.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("CreateContent Error:", error);
    res.status(500).json({ message: "Failed to create content" });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const files = req.files || [];
    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploads = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "ghumda/content" })
      )
    );

    const urls = uploads.map((u) => u.secure_url);
    res.status(200).json({ urls });
  } catch (error) {
    console.error("UploadImages Error:", error);
    res.status(500).json({ message: "Failed to upload images" });
  }
};


