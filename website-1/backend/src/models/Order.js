const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingDetails: { type: Object, required: true },
    orderStatus: { type: String, default: "placed" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
