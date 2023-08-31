import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js"; //? Instead we will call through the model we created

// @desc Fetch ALl Products
// @route GET/api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //? {empty} means we will find all products
  res.json(products);
});

// @desc Fetch single product
// @route GET/api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  // // const selectedProduct = products.find((p) => p._id === req.params.id);
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
});

// @desc Create a new sample product
// @route POST/api/Products
// @access PRIVATE/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.userCookies._id,
    name: "Sample Product",
    brand: "Sample Brand",
    img: "/images/sample.jpeg",
    description: "Sample Description",
    price: 0,
    countInStock: 0,
    category: "Sample Categories",
    rating: 0,
    reviewCount: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };
