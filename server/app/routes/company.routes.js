import express from "express";
import { getAllCompanies, getUsersByCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.get("/all", getAllCompanies);
router.get("/users/:companyId", getUsersByCompany);

export default router;
