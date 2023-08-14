import jwt from "jsonwebtoken";

export default function createToken(res, userId) {
  //   json web token
  const token = jwt.sign({ userIdFromJWT: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //  storing jwt as a cookie
  res.cookie("jwtCreate", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // converting mm to 30 days
  });
}
