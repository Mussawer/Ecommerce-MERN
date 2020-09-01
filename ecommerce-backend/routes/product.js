const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  getProductById,
  deleteProduct,
  updateProduct,
  getAllProducts,
  relatedProducts,
  listCategories,
  listBySearch,
  photo
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", getProductById);
//to create category we need user to be logged in
//for this we need to send userid in the route
//anytime there is userId in the route the userByid middleware runs and populate the user
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
//passing categoryId and userId to get category to delete of current user
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteProduct
);
//passing categoryId and userId to get category to update of current user
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
);

router.get("/products", getAllProducts);
router.get("/products/related/:productId", relatedProducts);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

//userById middleware to populate the user in the request
router.param("userId", userById);
//productById middleware to populate the product in the request
router.param("productId", productById);

module.exports = router;
