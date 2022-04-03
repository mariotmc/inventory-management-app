const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 20 },
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
});

// Virtual for this genre instance URL.
CategorySchema.virtual("url").get(function () {
  return "/categories/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);
