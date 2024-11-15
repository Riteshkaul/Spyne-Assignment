const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./config/db.js");
const authRoutes = require("./Routes/userRoutes.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authMiddleWare = require("./middleware/authMiddleWare.js");
const carRouter = require("./Routes/carRoutes.js");
const docRouter = require("./Routes/docRoutes.js");
const app = express();
dotenv.config();
app.use(morgan());
const corsOptions = {
  origin: "https://carmanagementt.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
connectDb();

app.use("/api", authRoutes);
app.use("/api/car", carRouter);
app.use("/api/docs", docRouter);
app.get("/protected", authMiddleWare, (req, res) => {
  res.json({
    message: "This is a protected routed",
    user: req.user,
  });
});
const port = 3000;
app.listen(port, (req, res) => {
  console.log("Server is running on", port);
});
