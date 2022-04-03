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

// Display list of all products
exports.productsList = (req, res, next) => {
  Product.find()
    .sort([["name", "ascending"]])
    .populate("category")
    .exec((err, listOfProducts) => {
      // On error
      if (err) next(err);

      // On success
      res.render("productsList", { title: "All products", listOfProducts: listOfProducts });
    });
};

// Display detail page for a specific product
exports.productDetail = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  async.parallel(
    {
      product: (callback) => Product.findById(id).populate("category").exec(callback),
    },

    (err, results) => {
      // On error
      if (err) next(err);
      if (results.product == null) {
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
      }

      // On success
      res.render("productDetail", {
        title: results.product.name,
        product: results.product,
      });
    }
  );
};

// Display product create form on GET
exports.productCreateGet = (req, res, next) => {
  // Get all categories (in order to add to new product)
  async.parallel(
    {
      categories: (callback) => Category.find(callback),
    },

    (err, results) => {
      // On error
      if (err) next(err);

      // On success
      res.render("productForm", { title: "Create a product", categories: results.categories });
    }
  );
};

// Handle product create on POST
exports.productCreatePost = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("image").escape(),
  body("category.*").escape(),
  body("brand", "Brand must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Product object with escaped and trimmed data.
    const product = new Product({
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
      category: req.body.category,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      // On error render form again with sanitized values/error messages

      // Get all categories for form
      async.parallel(
        {
          categories: (callback) => Category.find(callback),
        },
        (err, results) => {
          // On error
          if (err) next(err);

          // Mark selected categories as checked
          for (let i = 0; i < results.categories.length; i++) {
            if (product.category.indexOf(results.categories[i]._id) > -1) {
              results.categories[i].checked = "true";
            }
          }

          // On success
          res.render("productForm", {
            title: "Create a product",
            product: product,
            categories: results.categories,
            errors: errors.array(),
          });
        }
      );

      return;
    } else {
      // Data from form is valid save product
      product.save((err) => {
        // On error
        if (err) next(err);

        // On success
        res.redirect(product.url);
      });
    }
  },
];

// Display product delete form on GET
exports.productDeleteGet = (req, res, next) => {
  async.parallel(
    {
      product: (callback) => Product.findById(req.params.id).populate("category").exec(callback),
    },
    (err, results) => {
      // On error
      if (err) next(err);

      // On no results
      if (results.product == null) {
        res.redirect("/product");
      }

      // On success
      res.render("productDelete", {
        title: "Delete product",
        product: results.product,
      });
    }
  );
};

// Handle product delete on POST
exports.productDeletePost = (req, res, next) => {
  async.parallel(
    {
      product: (callback) => Product.findById(req.params.id).populate("category").exec(callback),
    },

    (err, results) => {
      // On error
      if (err) next(err);

      // On success
      Product.findByIdAndRemove(req.body.id, (err) => {
        // On error
        if (err) next(err);

        // On success
        res.redirect("/product");
      });
    }
  );
};

// Display product update form on GET
exports.productUpdateGet = (req, res, next) => {
  // Get product & categories for form
  async.parallel(
    {
      product: (callback) => Product.findById(req.params.id).populate("category").exec(callback),
      categories: (callback) => Category.find(callback),
    },
    (err, results) => {
      // On error
      if (err) next(err);
      if (results.product == null) {
        // No results
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
      }

      // On success
      // Mark selected categories as checked
      for (let i = 0; i < results.categories.length; i++) {
        for (let j = 0; j < results.product.category.length; j++) {
          if (results.categories[i]._id.toString() === results.product.category[j]._id.toString()) {
            results.categories[i].checked = "true";
          }
        }
      }

      res.render("productForm", {
        title: "Update product",
        product: results.product,
        categories: results.categories,
      });
    }
  );
};

// Handle product update on POST
exports.productUpdatePost = [
  // Convert the category to an array
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  // Validate and sanitize fields
  body("name", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("image").escape(),
  body("category.*").escape(),
  body("brand", "Brand must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from request
    const errors = validationResult(req);

    // Create a product object with escaped/trimmed data and old id
    const product = new Product({
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
      category: typeof req.body.category === "undefined" ? [] : req.body.category,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
      _id: req.params.id, // required otherwise new ID will be assigned
    });

    if (!errors.isEmpty()) {
      // On error render form again with sanitized values/error messages

      // Get all categories for form
      async.parallel(
        {
          categories: (callback) => {
            Category.find(callback);
          },
        },
        (err, results) => {
          // On error
          if (err) next(err);

          // On success
          // Mark selected categories as checked
          for (let i = 0; i < results.categories.length; i++) {
            if (product.category.indexOf(results.categories[i]._id) > -1) {
              results.categories[i].checked = "true";
            }
          }

          res.render("productForm", {
            title: "Update product",
            product: product,
            categories: results.categories,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid, update the record
      Product.findByIdAndUpdate(req.params.id, product, {}, (err, theProduct) => {
        // On error
        if (err) next(err);

        // On success
        res.redirect(theProduct.url);
      });
    }
  },
];

// Upload category/product image from form
exports.uploadImage = upload.single("image");
