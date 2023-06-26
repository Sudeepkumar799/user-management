import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController";
import { protect } from "../controllers/authController";

const router = express.Router();

router
  .get("/all", protect, getUsers)
  .get("/one", protect, getUser)
  .post("/create", protect, createUser)
  .put("/update/:userId", protect, updateUser)
  .delete("/delete/:userId", protect, deleteUser);

export default router;
