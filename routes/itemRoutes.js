const express = require('express');
const itemController = require('../controllers/itemController');
// const authController = require('../controllers/authController');
// const purchaseRouter = require('./purchaseRoutes');

const router = express.Router();

// router.use(authController.restrictTo('admin', 'lead-guide'));

router.route('/').get(itemController.readAllItems);

router.route('/options').get(itemController.getOptions);

router.route('/:name').get(itemController.getCarOptions);

router
  .route('/:name/:car')
  .get(itemController.getItem)
  .patch(itemController.updateItem);

module.exports = router;
