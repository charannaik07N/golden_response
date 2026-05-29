const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate(
      "products.productId",
    );
    return res.json(cart || { products: [], totalAmount: 0 });
  } catch (err) {
    return next(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.userId,
        products: [],
        totalAmount: 0,
      });
    }

    const existing = cart.products.find(
      (item) => item.productId.toString() === productId,
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.totalAmount = await calculateTotal(cart);
    await cart.save();

    const populated = await cart.populate("products.productId");
    return res.json(populated);
  } catch (err) {
    return next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find((p) => p.productId.toString() === id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;
    cart.totalAmount = await calculateTotal(cart);
    await cart.save();

    const populated = await cart.populate("products.productId");
    return res.json(populated);
  } catch (err) {
    return next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== id,
    );
    cart.totalAmount = await calculateTotal(cart);
    await cart.save();

    const populated = await cart.populate("products.productId");
    return res.json(populated);
  } catch (err) {
    return next(err);
  }
};

const calculateTotal = async (cart) => {
  let total = 0;
  for (const item of cart.products) {
    const product = await Product.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};

module.exports = { getCart, addItem, updateItem, removeItem };
