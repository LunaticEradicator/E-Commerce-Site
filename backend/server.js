import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
// import products from "./data/products.js"; // calling it from a separate productRouter file
import productRouter from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
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

// app.get("/", (req, res) => {
//   res.send("...........Running API.........");
// });

// routes
app.use("/api/products", productRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// paypal route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//static folder
const __dirname = path.resolve();
app.use(
  "/uploads",
  express.static(path.join(__dirname, "/frontend/public/uploads/"))
);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // any routes that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("...........Running API.........");
  });
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Listing to server ${port}`);
});

//! Custom Error Handling
app.use(notFoundURL);
app.use(errorHandler);

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const selectedProduct = products.find((p) => p._id === req.params.id);
//   res.json(selectedProduct);
// });
