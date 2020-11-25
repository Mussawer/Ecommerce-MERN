const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require('../controllers/auth');

const { userById, getUserById, updateUser, purchaseHistory } = require('../controllers/user');

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId', requireSignin, isAuth, getUserById);
router.put('/user/:userId', requireSignin, isAuth, updateUser);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById);

module.exports = router;