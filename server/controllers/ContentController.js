import Content from "../models/ContentModel.js";
import cloudinary from "../config/cloudinary.js";

export const listContent = async (_req, res) => {
  try {
    const items = await Content.find({})
      .populate({ path: "author", select: "fullName" })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(items);
  } catch (error) {
    console.error("ListContent Error:", error);
    res.status(500).json({ message: "Failed to fetch content" });
  }
};

export const createContent = async (req, res) => {
  try {
    console.log("Received content data:", req.body);
    
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
      location,
    } = req.body;
    
    console.log("Extracted location data:", location);

    if (!title || !description || !fullDescription || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (ward && (Number.isNaN(Number(ward)) || Number(ward) < 1 || Number(ward) > 12)) {
      return res.status(400).json({ message: "Ward must be a number between 1 and 12" });
    }

    if (price && Number.isNaN(Number(price))) {
      return res.status(400).json({ message: "Price must be numeric" });
    }

    const contentData = {
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
      location,
      author: req.user?._id,
    };
    
    console.log("Creating content with data:", contentData);
    
    const content = new Content(contentData);

    const saved = await content.save();
    console.log("Content saved successfully:", saved);
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


