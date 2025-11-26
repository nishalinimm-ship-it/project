import express from "express";
import {
  loginUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
    getUsersPaginated
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.post("/addUser", addUser);
router.put("/updateUser/:user_id", updateUser);
router.delete("/deleteUser/:user_id", deleteUser);
router.get("/getUsers", getUsersPaginated);


export default router;
