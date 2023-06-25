import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router
  .get("/", getUsers)
  .get("/:userId", getUser)
  .post("/create", createUser)
  .put("/update/:userId", updateUser)
  .delete("/delete/:userId", deleteUser);

export default router;
