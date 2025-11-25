import express from "express";
import {
  loginUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.post("/addUser", addUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
