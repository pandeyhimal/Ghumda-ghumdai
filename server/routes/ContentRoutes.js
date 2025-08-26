import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { createContent, uploadImages, listContent } from "../controllers/ContentController.js";
import multer from "multer";
import path from "path";
import { body, validationResult } from "express-validator";

const ACCEPTED_MIMES = ["image/jpeg", "image/jpg", "image/png"];
const upload = multer({
  dest: path.join(process.cwd(), "uploads/"),
  fileFilter: (_req, file, cb) => {
    if (ACCEPTED_MIMES.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only jpg, jpeg, png files are allowed"));
  },
});

const router = express.Router();

const createContentValidators = [
  body("title").trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
  body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
  body("fullDescription").trim().isLength({ min: 20 }).withMessage("Full description must be at least 20 characters"),
  body("category").isIn(["places", "food", "traditions"]).withMessage("Invalid category"),
  body("district").optional({ values: "falsy" }).isString().withMessage("District must be a string"),
  body("municipality").optional({ values: "falsy" }).isString().withMessage("Municipality must be a string"),
  body("ward").optional({ values: "falsy" }).isInt({ min: 1, max: 12 }).withMessage("Ward must be between 1 and 12"),
  body("price").optional({ values: "falsy" }).isNumeric().withMessage("Price must be numeric"),
  body("rating").optional({ values: "falsy" }).isInt({ min: 0, max: 5 }).withMessage("Rating must be 0-5"),
  body("reviewCount").optional({ values: "falsy" }).isInt({ min: 0 }).withMessage("Review count must be >= 0"),
  body("tips").optional({ values: "falsy" }).isArray().withMessage("Tips must be an array of strings"),
  body("tips.*").optional({ values: "falsy" }).isString().withMessage("Each tip must be a string"),
  body("tags").optional({ values: "falsy" }).isArray().withMessage("Tags must be a valid array"),
  body("tags.*").optional({ values: "falsy" }).isString().withMessage("Each tag must be a string"),
  body("image").optional({ values: "falsy" }).isURL().withMessage("Primary image must be a valid URL"),
  body("images").optional({ values: "falsy" }).isArray().withMessage("Images must be an array of URLs"),
  body("images.*").optional({ values: "falsy" }).isURL().withMessage("Each image must be a valid URL"),
  body("location").optional({ values: "falsy" }).isObject().withMessage("Location must be an object"),
  body("location.lat").optional({ values: "falsy" }).isFloat({ min: -90, max: 90 }).withMessage("Latitude must be between -90 and 90"),
  body("location.lng").optional({ values: "falsy" }).isFloat({ min: -180, max: 180 }).withMessage("Longitude must be between -180 and 180"),
  body("location.address").optional({ values: "falsy" }).isString().withMessage("Location address must be a string"),
];

router.get("/", async (_req, res, next) => {
  try {
    await listContent(_req, res);
  } catch (e) {
    next(e);
  }
});

router.post("/", protect, createContentValidators, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}, createContent);
router.post(
  "/upload",
  protect,
  (req, res, next) => {
    upload.array("images", 20)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message || "Upload failed" });
      }
      next();
    });
  },
  uploadImages
);

export default router;
