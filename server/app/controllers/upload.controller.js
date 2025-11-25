import db from "../config/db.config.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const savedFile = await db.uploads.create({
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      userId: null
    });

    res.status(200).json({ message: "File uploaded", data: savedFile });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUploads = async (req, res) => {
  try {
    const uploads = await db.uploads.findAll();
    res.status(200).json({ data: uploads });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
