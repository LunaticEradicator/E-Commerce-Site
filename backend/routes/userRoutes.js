import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsersAdmin,
  getUserByIdAdmin,
  updateUserAdmin,
  deleteUserAdmin,
} from "../controllers/userController.js";

import {
  protectedMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

//! Auth
router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
//! User
router.get("/profile", protectedMiddleware, getUserProfile);
router.put("/profile", protectedMiddleware, updateUserProfile);
//! Admin
router.get("/", protectedMiddleware, adminMiddleware, getUsersAdmin);
router.get("/:id", protectedMiddleware, adminMiddleware, getUserByIdAdmin);
router.put("/:id", protectedMiddleware, adminMiddleware, updateUserAdmin);
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteUserAdmin);

export default router;
