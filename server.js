import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoute from "./routes/product";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

// cau hinh
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

// connection database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// Routes
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
