
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch products",
    });
  }
});

// Get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID",
    });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Could not add product",
      error: error.message,
    });
  }
});

 // Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product updated successfully!",
      product: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Could not update product",
      error: error.message,
    });
  }
});


 // Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully!",
      product: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Could not delete product",
      error: error.message,
    });
  }
});



module.exports = router;
