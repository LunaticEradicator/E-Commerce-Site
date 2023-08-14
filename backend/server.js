import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
// import products from "./data/products.js"; // calling it from a separate productRouter file
import productRouter from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFoundURL, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

const port = process.env.PORT || 8080;
app.use(cors());

app.get("/", (req, res) => {
  res.send("...........Running API.........");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRoutes);
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const selectedProduct = products.find((p) => p._id === req.params.id);
//   res.json(selectedProduct);
// });

//! Custom Error Handling
app.use(notFoundURL);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listing to server ${port}`);
});
