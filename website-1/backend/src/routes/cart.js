const express = require("express");
const auth = require("../middleware/auth");
const {
  getCart,
  addItem,
  updateItem,
  removeItem,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", auth, getCart);
router.post("/", auth, addItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, removeItem);

module.exports = router;
