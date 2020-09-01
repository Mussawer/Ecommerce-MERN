const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, getUserById, updateUser } = require('../controllers/user');

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId', requireSignin, isAuth, getUserById);
router.put('/user/:userId', requireSignin, isAuth, updateUser);

router.param('userId', userById);

module.exports = router;