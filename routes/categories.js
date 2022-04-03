const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// CATEGORY ROUTES

// GET request for creating a category
router.get("/create", categoryController.categoryCreateGet);

// POST request for creating a category
router.post("/create", categoryController.uploadImage, categoryController.categoryCreatePost);

// GET request for deleting a category
router.get("/:id/delete", categoryController.categoryDeleteGet);

// POST request for deleting a category
router.post("/:id/delete", categoryController.categoryDeletePost);

// GET request for updating a category
router.get("/:id/update", categoryController.categoryUpdateGet);

// POST request for updating a category
router.post("/:id/update", categoryController.uploadImage, categoryController.categoryUpdatePost);

// GET request for category detail page
router.get("/:id", categoryController.categoryDetail);

// GET request for list of all categories
router.get("/", categoryController.categoriesList);

module.exports = router;
