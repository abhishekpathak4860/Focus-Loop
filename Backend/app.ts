import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes"; // <--- Import this
import taskRoutes from "./src/routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL as string,
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // Debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Important for Cookies
  }),
);
// Test Route
app.get("/", (req, res) => {
  res.send("Task Management API is running...");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
