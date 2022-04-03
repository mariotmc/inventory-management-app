const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// PRODUCT ROUTES

// GET request for list of all products
router.get("/", productController.productsList);

// GET request for creating a product
router.get("/create", productController.productCreateGet);

// POST request for creating a product
router.post("/create", productController.uploadImage, productController.productCreatePost);

// GET request for deleting a product
router.get("/:id/delete", productController.productDeleteGet);

// POST request for deleting a product
router.post("/:id/delete", productController.productDeletePost);

// GET request for updating a product
router.get("/:id/update", productController.productUpdateGet);

// POST request for updating a product
router.post("/:id/update", productController.uploadImage, productController.productUpdatePost);

// GET request for product detail page
router.get("/:id", productController.productDetail);

module.exports = router;
