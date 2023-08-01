import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import products from "./data/products.js"; // always add extension on backend
import usersData from "./data/users.js"; // Faker users
import connectDB from "./config/db.js";

//* Models
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();
connectDB(); // connect to mongoose

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(usersData);

    const AdminUser = createdUsers[0]._id;
    const sampleProductsData = products.map((p) => {
      return { ...p, user: AdminUser };
    });
    const createdProducts = await Product.insertMany(sampleProductsData);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // kills connection
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("Data Deleted!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // kills connection
  }
};

// process.argv is used to add argument to node file
// node backend/seed.js -d  = >will add -d as its [2] argument

// when we run the script data: destroy
if (process.argv[2] === "-d") {
  destroyData();
  console.log(process.argv[2]);
} else {
  importData();
}
