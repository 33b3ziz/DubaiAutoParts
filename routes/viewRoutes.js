const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/purchases', authController.protect, viewsController.getPurchase);
router.get('/expenses', authController.protect, viewsController.getExpense);
router.get('/sales', authController.protect, viewsController.getSale);
router.get('/items', authController.protect, viewsController.getItem);

module.exports = router;

// router.get('/signup', viewsController.getSignupForm);
