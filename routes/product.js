import express from "express";
import productController from "../controllers/productController";
import middlewareController from "../controllers/middlewareController";

const router = express.Router();

// Create new product
router.post(
  "/create/new",
  middlewareController.verifyTokenAndAdminAuth,
  productController.createNewProduct
);

// Get all products with Search
router.get("/", productController.getAllProductWithSearch);

// detail product
// router.get("/:productId", read);

// router.param("productId", productById);

// // delete product
// router.delete(
//   "/:productId",
//   middlewareController.verifyTokenAndAdminAuth,
//   remove
// );

// update product

module.exports = router;
