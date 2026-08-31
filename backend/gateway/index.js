import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import  protect  from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controller/user.controller.js";

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();
app.use(cookieParser());
app.use(cors(
  { origin: process.env.FRONTEND_URL , credentials: true }
));
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.get("/api/me", protect, getCurrentUser);


app.get("/", (req, res) => {
  res.json({ message: "Hello from the gateway server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});