import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

// app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the auth server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});