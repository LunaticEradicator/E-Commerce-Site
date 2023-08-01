import products from "../data/products.js";
import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const selectedProduct = products.find((p) => p._id === req.params.id);
    if (selectedProduct) {
      res.json(selectedProduct);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);

export default router;
