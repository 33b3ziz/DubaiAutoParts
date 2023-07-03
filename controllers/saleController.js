const Sale = require('../models/saleModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {};

exports.createSale = factory.createOne(Sale);
exports.getSale = factory.getOne(Sale);
exports.updateSale = factory.updateOne(Sale);
exports.deleteSale = factory.deleteOne(Sale);

exports.getAllSales = factory.getAll(Sale);
