const Expense = require('../models/expenseModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createExpense = factory.createOne(Expense);
exports.getExpense = factory.getOne(Expense);
exports.updateExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);
exports.getAllExpenses = factory.getAll(Expense);
