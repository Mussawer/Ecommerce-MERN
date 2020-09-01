const express = require('express');
const router = express.Router();

const { create, categoryById, getCategoryById, updateCategory, deleteCategory, getAllCategories } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', getCategoryById);
//to create category we need user to be logged in
//for this we need to send userid in the route
//anytime there is userId in the route the userByid middleware runs and populate the user
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

//passing categoryId and userId to get category to update of current user
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory);
//passing categoryId and userId to get category to delete of current user
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, deleteCategory);
router.get('/categories', getAllCategories);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;