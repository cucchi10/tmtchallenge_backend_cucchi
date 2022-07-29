import express from "express";
import morgan from "morgan";
// Routes
import blogRoutes from "./routes/blog.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Static
//app.use(express.static('public'))

// Settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/users", authRoutes);
app.use("/blogs", blogRoutes);

export default app;
