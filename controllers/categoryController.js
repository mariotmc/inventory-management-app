const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const async = require("async");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const { body, validationResult } = require("express-validator");

// Helper function to format the received path
const formatPath = (str) => {
  return str.replaceAll("\\", "/").slice(6);
};

// Display list of all categories
exports.categoriesList = (req, res, next) => {
  Category.find()
    .sort([["name", "ascending"]])
    .exec((err, listOfCategories) => {
      // On error
      if (err) next(err);

      // On success
      res.render("categoriesList", { title: "Categories", listOfCategories: listOfCategories });
    });
};

// Display detail page for a specific category
exports.categoryDetail = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  async.parallel(
    {
      category: (callback) => {
        Category.findById(id).exec(callback);
      },
      categoryProducts: (callback) => {
        Product.find({ category: id }).exec(callback);
      },
    },

    (err, results) => {
      // On error
      if (err) next(err);
      if (results.category == null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }

      // On success
      res.render("categoryDetail", {
        title: results.category.name,
        image: results.image,
        category: results.category,
        categoryProducts: results.categoryProducts,
      });
    }
  );
};

// Display category create form on GET
exports.categoryCreateGet = (req, res, next) => {
  res.render("categoryForm", { title: "Create a category" });
};

// Handle category create on POST
exports.categoryCreatePost = [
  // Validate and sanitize the name field
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
  body("image").escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from request
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
      image: {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: formatPath(req.file.path),
        size: req.file.size,
      },
    });

    if (!errors.isEmpty()) {
      // On error render form again with sanitized values/error messages
      res.render("categoryForm", {
        title: "Create a category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid
      // Check if category with same name already exists
      Category.findOne({ name: req.body.name }).exec((err, categoryFound) => {
        // On error
        if (err) next(err);
        // Category exists, redirect to its detail page
        if (categoryFound) {
          res.redirect(categoryFound.url);
        } else {
          category.save((err) => {
            if (err) next(err);

            // Category saved, redirect to category detail page
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

// Display category delete form on GET
exports.categoryDeleteGet = (req, res, next) => {
  // Get category and all its products
  async.parallel(
    {
      category: (callback) => Category.findById(req.params.id).exec(callback),
      categoryProducts: (callback) => Product.find({ category: req.params.id }).exec(callback),
    },
    (err, results) => {
      // On error
      if (err) return next(err);

      // On no results
      if (results.category == null) res.redirect("/categories");

      // On success
      res.render("categoryDelete", {
        title: "Delete category",
        category: results.category,
        categoryProducts: results.categoryProducts,
      });
    }
  );
};

// Handle Category delete on POST.
exports.categoryDeletePost = (req, res, next) => {
  // Get category and all its products
  async.parallel(
    {
      category: (callback) => Category.findById(req.params.id).exec(callback),
      categoryProducts: (callback) => Product.find({ category: req.params.id }).exec(callback),
    },
    (err, results) => {
      // On error
      if (err) next(err);

      // On success
      if (results.categoryProducts.length > 0) {
        // Category has books, render in same way as for GET route
        res.render("categoryDelete", {
          title: "Delete category",
          category: results.category,
          categoryProducts: results.categoryProducts,
        });
        return;
      } else {
        // Category has no books, delete object and redirect to the list of categories
        Category.findByIdAndRemove(req.body.id, (err) => {
          // On error
          if (err) next(err);

          // On success
          res.redirect("/categories");
        });
      }
    }
  );
};

// Display category update form on GET
exports.categoryUpdateGet = (req, res, next) => {
  // Get the category
  Category.findById(req.params.id, (err, category) => {
    // On error
    if (err) return next(err);

    // On no results
    if (category == null) {
      const err = new Error("Category not found");
      err.status = 404;
      return next(err);
    }

    // On success
    res.render("categoryForm", { title: "Update category", category: category });
  });
};

// Handle category update on POST
exports.categoryUpdatePost = [
  // Validate and sanitze the name field
  body("name", "Category name must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),
  body("image").escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data (and the old id)
    const category = new Category({
      name: req.body.name,
      image: {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: formatPath(req.file.path),
        size: req.file.size,
      },
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors, render the form again with sanitized values and error messages
      res.render("categoryForm", { title: "Update Category", category: category, errors: errors.array() });
      return;
    } else {
      // Data from form is valid, update the record
      Category.findByIdAndUpdate(req.params.id, category, {}, (err, theCategory) => {
        // On error
        if (err) return next(err);

        // On success
        res.redirect(theCategory.url);
      });
    }
  },
];

// Upload category/product image from form
exports.uploadImage = upload.single("image");
