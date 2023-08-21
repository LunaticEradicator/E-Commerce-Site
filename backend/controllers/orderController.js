import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc to add order of items
// @route POST/api/orders/
// @auth Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => {
        return { ...x, product: x._id, id: undefined };
      }),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
  // res.send("add order of items");
});

// @desc get user order
// @route GET/api/orders/myorders
// @auth Private
const getMyOrders = asyncHandler(async (req, res) => {
  const myOrder = Order.find({ user: req.user.user._id });
  res.state(200).json(myOrder);
  if (myOrder) {
    res.state(200).json(myOrder);
  } else {
    res.status(404);
    throw new Error("Order of User Not Found");
  }
  // res.send("get my order");
});

// @desc get user order by id
// @route GET/api/orders/:id
// @auth Private
const getMyOrdersById = asyncHandler(async (req, res) => {
  const OrderById = Order.findById(req.params.id)
    // add name and email from user to the orderId
    .populate("user", "name email");

  if (OrderById) {
    res.status(200).json(OrderById);
  } else {
    res.status(404);
    throw new Error("Order Not Found by ID");
  }
  // res.send("get my order by id");
});

// @desc Update Order to paid
// @route GET/api/orders/:id/pay
// @auth Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update order to Paid");
});

// @desc Update Order to delivered
// @route GET/api/orders/:id/deliver
// @auth Private/Admin
const updateOrderToDeliveredAdmin = asyncHandler(async (req, res) => {
  res.send("Admin : Update order to Delivered");
});

// @desc Get all orders
// @route GET/api/orders
// @auth Private/Admin
const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  res.send("Admin : Getting All Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getMyOrdersById,
  updateOrderToPaid,
  updateOrderToDeliveredAdmin,
  getAllOrdersAdmin,
};
