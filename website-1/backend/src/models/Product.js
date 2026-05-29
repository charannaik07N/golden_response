const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    externalId: { type: Number, index: true },
    title: { type: String, required: true, index: true },
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, index: true },
    rating: { type: Number },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
