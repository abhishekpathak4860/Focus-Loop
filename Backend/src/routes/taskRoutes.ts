import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createTask);
router.get("/", getTasks);

router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
