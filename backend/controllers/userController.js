import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import * as bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

//! Auth

//? @desc   auth User [Login] & get tokens
// @route  POST/api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  // req.body is the data user entered
  // userDB is the data from database
  const { email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  console.log(req.body);

  // checking if the entered email and password [req.body] meets an user from the User model [usersDB]
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    createToken(res, userExist._id);
    res.status(200).json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
    });
    // res.json(usersDB);
    // res.send("User Authenticated | User Login ");
  } else {
    res.status(401);
    throw new Error("Invalid Email Or Password.");
  }
});

// ! fix register user [request /register user in postman]
//? @desc   register a new User
// @route  POST/api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  // Creating a Model
  const userCreate = await User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    // isAdmin is already has a default value [false] in the User Model
  });

  if (userCreate) {
    createToken(res, userCreate._id);
    res.status(201).json({
      _id: userCreate._id,
      name: userCreate.name,
      email: userCreate.email,
      isAdmin: userCreate.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//? @desc   logout the user
// @route  POST/api/users/logout
// access  public
const logoutUser = asyncHandler(async (req, res) => {
  // clearing cookies
  res.cookie("jwtCreate", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logout" });
  // return res.send("User Logout");
});

//! User
//? @desc   Show User Profile
// @route  GET/api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  // req.userCookies => Created in Auth Middleware
  const userExist = await User.findById(req.userCookies._id);

  if (userExist) {
    res.status(200).json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
    });
    // res.send("User Profile Login through jwt from cookies");
  } else {
    res.status(401);
    throw new Error("User Doesn't Exist");
  }
});

//? @desc  Update User Profile
// @route PUT/api/users/profile [no/:id because we will use web-tokens to store the id]
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  // req.userCookies => Created in Auth Middleware
  const userExist = await User.findById(req.userCookies._id);
  if (userExist) {
    // checking if we get a body parser to update user details
    userExist.name = req.body.name || userExist.name;
    userExist.email = req.body.email || userExist.email;
    // Because password is hashed we only want to change it if user ask for it
    if (req.body.password) {
      userExist.password = req.body.password;
    }

    // save the date if a new req.body parsing happens
    const updatedUser = await userExist.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Cannot Update User");
  }
});

//! Admin
//? @desc  Get All Users
// @route GET/api/users
// @access private/Admin
const getUsersAdmin = asyncHandler(async (req, res) => {
  res.send("Admin: Showing all Users ");
});

//? @desc  Get All Users
// @route GET/api/users/:id
// @access private/Admin
const getUserByIdAdmin = asyncHandler(async (req, res) => {
  res.send("Admin: Showing User by Id ");
});

//? @desc  Get All Users
// @route PUT/api/users/:id
// @access private/Admin
const updateUserAdmin = asyncHandler(async (req, res) => {
  res.send("Admin: Updating User ");
});

//? @desc  Get All Users
// @route DELETE/api/users/:id
// @access private/Admin
const deleteUserAdmin = asyncHandler(async (req, res) => {
  res.send("Admin: Deleting User ");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsersAdmin,
  getUserByIdAdmin,
  updateUserAdmin,
  deleteUserAdmin,
};
