const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { Order } = require("../models/order");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUserById = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

//we are going to get user from the request
//because when there is userId in the request
//userById runs and populate the user in the request
//so the userId is in request that we want to remove
exports.updateUser = (req, res) => {
  req.body.role = 0; // role will always be 0

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (error, user) => {
      if (error) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(400),
          json({
            error: "Could not update user purchase history",
          });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      } else {
        res.json(orders);
      }
    });
};
