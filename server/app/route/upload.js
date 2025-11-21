import express from "express";
import multer from "multer";
import { uploadFile, getFiles } from "../controller/file.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/upload", upload.single("myFiles"), uploadFile);
router.get("/files", getFiles);

export default router;
