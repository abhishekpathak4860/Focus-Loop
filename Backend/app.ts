import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes";
import taskRoutes from "./src/routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
const allowedOrigins = [
  "http://localhost:3000",
  "https://focus-loop-gamma.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
// Test Route
app.get("/", (req, res) => {
  res.send("Task Management API is running");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

//  VERY IMPORTANT: Vercel ke liye app export karna zaroori hai
export default app;
