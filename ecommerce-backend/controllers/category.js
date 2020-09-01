const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

//middleware to get categoryId
exports.categoryById = (req, res, next, id) => {
  //find category by id and then execute the callback
  Category.findById(id).exec((error, category) => {
    if (error || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ data });
  });
};

exports.getCategoryById = (req, res) => {
  return res.json(req.category);
};

//we are going to get product from the request
//because when there is productId in the request
//productById runs and populate the product in the request
//so the productId is in request that we want to update
exports.updateCategory = (req, res) => {
  console.log("req.body", req.body);
  console.log("category update param", req.params.categoryId);

  const category = req.category;
  category.name = req.body.name;
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

//we are going to get product from the request
//because when there is productId in the request
//productById runs and populate the product in the request
//so the productId is in request that we want to update
exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({
      message: "Category Deleted",
    });
  });
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};
