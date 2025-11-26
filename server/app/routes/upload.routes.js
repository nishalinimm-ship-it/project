import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadFile, getAllUploads } from "../controllers/upload.controller.js";

const router = express.Router();

router.get("/", getAllUploads);  
router.post("/", upload.single("file"), uploadFile);

export default router;

 app.use('/upload', uploadRoutes);