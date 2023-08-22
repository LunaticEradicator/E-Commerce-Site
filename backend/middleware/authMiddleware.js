import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// next means to go to the next middleware [all middleware have a next]
const protectedMiddleware = asyncHandler(async (req, res, next) => {
  // Read the jwt from the cookie
  //   let tokenFromCookie;
  let token;
  token = req.cookies.jwtCreate;
  //checking to see if a jwt token is available in the cookie we parsed
  // if available parse the
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userCookies = await User.findById(decodedToken.userIdFromJWT).select(
        "-password"
      ); // get the user data [res.json] without the password
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Received Token, but token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

// only if isAdmin is true we can access admin functionality
// ie only if we sign in as admin
const adminMiddleware = (req, res, next) => {
  // console.log(req.userCookies);
  if (req.userCookies && req.userCookies.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as admin");
  }
};

export { protectedMiddleware, adminMiddleware };
