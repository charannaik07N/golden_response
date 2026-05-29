const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createOrder = async (req, res, next) => {
  try {
    const { shippingDetails } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        orderItems.push({
          productId: product._id,
          quantity: item.quantity,
          price: product.price,
        });
        totalAmount += product.price * item.quantity;
      }
    }

    const order = await Order.create({
      userId: req.user.userId,
      products: orderItems,
      totalAmount,
      shippingDetails,
      orderStatus: "placed",
    });

    cart.products = [];
    cart.totalAmount = 0;
    await cart.save();

    return res.status(201).json(order);
  } catch (err) {
    return next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    return res.json(orders);
  } catch (err) {
    return next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createOrder, getOrders, getOrderById };
