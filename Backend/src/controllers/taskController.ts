import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

// --- CREATE TASK (You already have this) ---
export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  // ... (Your existing code)
  try {
    const { title, description, status } = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const newTask = await prisma.task.create({
      data: { title, description, status: status || "PENDING", userId },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// --- GET TASKS (With Pagination, Search, Filter) ---
export const getTasks = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { page = 1, limit = 5, status, search } = req.query;

    // Convert query params to numbers
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Build the query object dynamically
    const query: any = { userId }; // Always filter by logged-in user

    // Add Status Filter if provided (and not 'ALL')
    if (status && status !== "ALL") {
      query.status = status;
    }

    // Add Search Filter if provided
    if (search) {
      query.title = { contains: String(search), mode: "insensitive" }; // Case-insensitive search
    }

    // Execute two queries:
    // 1. Get the actual data
    // 2. Count total items (for pagination math)
    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where: query,
        skip: skip,
        take: pageSize,
        orderBy: { createdAt: "desc" }, // Newest first
      }),
      prisma.task.count({ where: query }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalTasks / pageSize);

    res.json({
      tasks,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: pageNumber,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// --- UPDATE TASK (PATCH) ---
export const updateTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const updates = req.body; // Contains title, description, status

    const task = await prisma.task.findFirst({
      where: { id: Number(id), userId },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: updates,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// --- DELETE TASK ---
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Ensure task belongs to user before deleting
    const task = await prisma.task.findFirst({
      where: { id: Number(id), userId },
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await prisma.task.delete({ where: { id: Number(id) } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
