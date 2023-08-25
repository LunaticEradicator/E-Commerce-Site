import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getMyOrdersById,
  updateOrderToPaid,
  updateOrderToDeliveredAdmin,
  getAllOrdersAdmin,
} from "../controllers/orderController.js";

const router = express.Router();

//! user
router.post("/", protectedMiddleware, addOrderItems);
router.get("/myorders", protectedMiddleware, getMyOrders);
router.get("/:id", protectedMiddleware, getMyOrdersById);
router.put("/:id/pay", protectedMiddleware, updateOrderToPaid);

//! admin
router.put(
  "/:id/deliver",
  protectedMiddleware,
  adminMiddleware,
  updateOrderToDeliveredAdmin
);
router.get("/", protectedMiddleware, adminMiddleware, getAllOrdersAdmin);

export default router;
