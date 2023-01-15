const express = require("express");
const router = express.Router();

// Model
const Inv = require("../models/inventario");
// Get inventory
router.get("/", async (req, res) => {
  const products = await Inv.find();
  res.json(products);
});

// Get a product from the inventory
router.get("/:id", async (req, res) => {
  const product = await Inv.findById(req.params.id);
  res.json(product);
});

// ADD a new product
router.post("/save", async (req, res) => {
  const { title, description, price, quantity } = req.body;
  const product = new Inv({ title, description, price, quantity });
  await product.save();
  res.json({ status: "Product Saved" });
});

// UPDATE a product
router.put("/:id", async (req, res) => {
  const { title, description, price, quantity } = req.body;
  const newProduct = { title, description, price, quantity, user };
  await Inv.findByIdAndUpdate(req.params.id, newProduct);
  res.json({ status: "Product Updated" });
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  await Inv.findByIdAndRemove(req.params.id);
  res.json({ status: "Product Deleted" });
});

module.exports = router;
