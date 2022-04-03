const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  image: {
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number },
  },
  category: [{ type: Schema.ObjectId, ref: "Category", required: true }],
  brand: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 500 },
  price: { type: Number, required: true },
});

// Virtual for this product instance URL.
ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});

module.exports = mongoose.model("Product", ProductSchema);
