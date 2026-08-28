import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();
app.use(cors());
app.use("/auth",proxy(process.env.AUTH_SERVICE));

app.get("/", (req, res) => {
  res.json({ message: "Hello from the gateway server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});