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
// @access PRIVATE/ADMIN
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

// @desc Update a single Product
// @route PUT/api/products/:id/edit
// @access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, img, brand, category, countInStock } =
    req.body;
  const productExist = await Product.findById(req.params.id);

  if (productExist) {
    productExist.name = name;
    productExist.price = price;
    productExist.description = description;
    productExist.img = img;
    productExist.brand = brand;
    productExist.category = category;
    productExist.countInStock = countInStock;

    const updateProduct = await productExist.save();
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc To Get a product
// @route DELETE/api/products/:id
// @access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const productExist = await Product.findById(req.params.id);

  if (productExist) {
    await Product.deleteOne({ _id: productExist._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Cannot Find Product To Delete");
  }
});

// @desc To create a review for a Product
// @route POST/api/products/:id/reviews
// @access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, topic } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    // person reviewing    === logged in user
    const alreadyReviewed = product.reviews.find((review) => {
      return review.user.toString() === req.userCookies._id.toString();
    });

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("User Already Has Given a Review for the Product");
    }

    const newReview = {
      user: req.userCookies._id,
      name: req.userCookies.name,
      rating: Number(rating),
      comment: comment,
      topic: topic,
    };

    // products reviews
    product.reviews.push(newReview);
    product.reviewCount = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Cannot Find Product To Delete");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
