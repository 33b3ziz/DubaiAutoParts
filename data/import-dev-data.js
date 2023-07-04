const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Item = require('../models/itemModel');
const Expense = require('../models/expenseModel');
const Purchase = require('../models/purchaseModel');
const Sale = require('../models/saleModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to database'));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const items = JSON.parse(
  fs.readFileSync(`${__dirname}/expenses.json`, 'utf-8')
);
const expenses = JSON.parse(
  fs.readFileSync(`${__dirname}/expenses.json`, 'utf-8')
);
const purchases = JSON.parse(
  fs.readFileSync(`${__dirname}/purchases.json`, 'utf-8')
);
const sales = JSON.parse(
  fs.readFileSync(`${__dirname}/purchases.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Item.create(items);
    await Expense.create(expenses);
    await Purchase.create(purchases);
    await Sale.create(sales);
    console.log('Data Loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Item.deleteMany();
    await Expense.deleteMany();
    await Purchase.deleteMany();
    await Sale.deleteMany();
    console.log('Data Deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
