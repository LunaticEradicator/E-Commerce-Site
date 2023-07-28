import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import products from "./data/products.js"; //! extension is a must

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("...........Running API.........");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const selectedProduct = products.find((p) => p._id === req.params.id);
  res.json(selectedProduct);
});

app.listen(port, () => {
  console.log(`Listing to server ${port}`);
});
