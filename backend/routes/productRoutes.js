// import express from "express";
// import Product from "../models/productModel.js";
// import asyncHandler from "express-async-handler";
// import { protect, admin } from "../middleware/authMiddleware.js";
// import { createProducts } from "../controllers/productController.js";
// const router = express.Router();

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       return res.json(product);
//     }
//     res.status(404).json({ message: "Product not found" });
//   })
// );

// export default router;
import express from "express";

const router = express.Router();

import {
  getProducts,
  getProductById,
  createProducts,
  updateProduct,
  deleteProduct,
  CreateProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProducts);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, CreateProductReview);

export default router;
