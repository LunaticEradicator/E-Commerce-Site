import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
// import products from "../data/products.js"; //! no need since we are calling it from database through model we created
import Product from "../models/productModel.js"; //? Instead we will call through the model we created

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); //? {empty} means we will find all products
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // const selectedProduct = products.find((p) => p._id === req.params.id);
    const selectedProduct = await Product.findById(req.params.id);
    if (selectedProduct) {
      res.json(selectedProduct);
    } else {
      // won't work because cast error will take place and display a default html message [status:500]
      // res.status(404).json({ message: "Product Not Found" }); //? instead we created our own custom error handler
      throw new Error(
        "Hmm... Seems like the product is missing from our inventory."
      );
    }
  })
);

// Till here we are calling from data/product.js
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     res.json(products);
//   })
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const selectedProduct = products.find((p) => p._id === req.params);
//     res.json(selectedProduct);
//   })
// );

export default router;
