import Product from "../models/product.model.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
  const products = await Product.find({});

  try {
    res.status(200).json({
      message: "Products fetched successfully!",
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(`Error in fetching products: ${error.message}`);
    res.status(500).json({
      message: "Server Error!",
      success: false,
    });
  }
};

const createProduct = async (req, res) => {
  const product = req.body; //user will send
  if (!product.name || !product.image || !product.price) {
    return res.status(400).json({
      message: "Please fill all the fields!",
      success: false,
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully!",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(`Error in creating product :${error.message}`);
    res.status(500).json({
      message: "Server error!",
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Product not found!",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      message: "Product updated succesfully!",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Product not found!",
      success: false,
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted!",
      success: true,
    });
  } catch (error) {
    console.log(`Error in deleting product: ${error.message}`);
    res.status(500).json({
      message: "Server Error!",
      success: false,
    });
  }
};

export { createProduct, updateProduct, deleteProduct, getProducts };
