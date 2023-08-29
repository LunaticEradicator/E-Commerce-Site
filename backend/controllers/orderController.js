import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc to add order of items
// @route POST/api/orders
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
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.userCookies._id,
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
});

// @desc Get All Orders of logged in User
// @route GET/api/orders/myorders
// @auth Private
const getMyOrders = asyncHandler(async (req, res) => {
  const myOrders = await Order.find({ user: req.userCookies._id });
  if (myOrders) {
    res.status(200).json(myOrders);
  } else {
    res.status(404);
    throw new Error("No Order Found For User");
  }
});

// @desc Get a particular Orders of logged in User
// @route GET/api/orders/:id
// @auth Private
const getMyOrdersById = asyncHandler(async (req, res) => {
  // add name and email from USER to the OrderById
  const OrderById = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (OrderById) {
    res.status(200).json(OrderById);
  } else {
    res.status(404);
    throw new Error("Order Not Found by ID");
  }
  // res.send("get my order by id");
});

// @desc Update Order to paid
// @route PUT/api/orders/:id/pay
// @auth Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//! Admin
// @desc Get all orders
// @route GET/api/orders
// @auth Private/Admin
const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  const getAllOrders = await Order.find({}).populate("user", "name email");
  res.status(200).json(getAllOrders);
});

// @desc Update Order to delivered
// @route PUT/api/orders/:id/deliver
// @auth Private/Admin
const updateOrderToDeliveredAdmin = asyncHandler(async (req, res) => {
  res.send("Admin : Update order to Delivered");
});

export {
  addOrderItems,
  getMyOrders,
  getMyOrdersById,
  updateOrderToPaid,
  updateOrderToDeliveredAdmin,
  getAllOrdersAdmin,
};
