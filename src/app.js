import express from "express";
import morgan from "morgan";
// Routes
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// Static
//app.use(express.static('public'))

// Settings
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
