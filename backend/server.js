import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// import products from "./data/products.js"; // calling it from a separate productRouter file
import productRouter from "./routes/productRoutes.js";
import { notFoundURL, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.send("...........Running API.........");
});

app.use("/api/products", productRouter);
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
