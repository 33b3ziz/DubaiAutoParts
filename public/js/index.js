/* eslint-disable */
import '@babel/core';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';
import axios from 'axios';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);

/* Helper Functions
/* ========================================================================== */

function parsePrice(number) {
  return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

function parseFloatHTML(element) {
  return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 0;
}

function updateNumber(e) {
  var activeElement = document.activeElement,
    value = parseFloat(activeElement.innerHTML),
    wasPrice =
      activeElement.innerHTML == parsePrice(parseFloatHTML(activeElement));

  if (!isNaN(value) && (e.keyCode == 38 || e.keyCode == 40 || e.wheelDeltaY)) {
    e.preventDefault();

    value +=
      e.keyCode == 38
        ? 1
        : e.keyCode == 40
        ? -1
        : Math.round(e.wheelDelta * 0.025);
    value = Math.max(value, 0);

    activeElement.innerHTML = wasPrice ? parsePrice(value) : value;
  }

  updateInvoice(getType());
}

// Update Invoice Total Cells
function updateInvoice(invoiceType) {
  var sumOfTotal = 0,
    sumOfProfit = 0;
  var cells, total, a, i;

  if (invoiceType == 'expenses') {
    for (
      var a = document.querySelectorAll('table.inventory tbody tr'), i = 0;
      a[i];
      ++i
    ) {
      // get inventory row cells
      cells = a[i].querySelectorAll('span');

      total = parseFloatHTML(cells[1]) * parseFloatHTML(cells[2]);

      sumOfTotal += total;

      cells[3].innerHTML = total;

      document.querySelector('table.meta tr:last-child td span').innerHTML =
        sumOfTotal;
    }
  } else if (invoiceType == 'purchases') {
    for (
      var a = document.querySelectorAll('table.inventory tbody tr'), i = 0;
      a[i];
      ++i
    ) {
      // get inventory row cells
      cells = a[i].querySelectorAll('span');

      total = parseFloatHTML(cells[2]) * parseFloatHTML(cells[3]);

      sumOfTotal += total;

      cells[4].innerHTML = total;

      document.querySelector('table.meta tr:last-child td span').innerHTML =
        sumOfTotal;
    }
  } else if (invoiceType == 'sales') {
    for (
      var a = document.querySelectorAll('table.inventory tbody tr'), i = 0;
      a[i];
      ++i
    ) {
      // get inventory row cells
      cells = a[i].querySelectorAll('span');

      total = parseFloatHTML(cells[2]) * parseFloatHTML(cells[3]);

      sumOfTotal += total;

      cells[4].innerHTML = total;

      document
        .querySelectorAll('table.meta tr')[3]
        .querySelector('td span').innerHTML = sumOfTotal;

      // Profit
      let profit = total - parseFloatHTML(cells[2]) * parseFloatHTML(cells[6]);

      sumOfProfit += profit;

      cells[8].innerHTML = profit;

      document
        .querySelectorAll('table.meta tr')[4]
        .querySelector('td span').innerHTML = sumOfProfit;
    }
  }
}

// Get Item Options List
async function createItemsListOnFirstRow() {
  const response = await axios.get('/api/v1/items/options');
  const options = response.data.data;

  document.getElementsByClassName('firstList')[0].innerHTML = options;
}

// Add New Row
function generateTableRow(invoiceType) {
  const emptyRow = document.createElement('tr');

  if (invoiceType == 'expenses') {
    emptyRow.innerHTML =
      '<td><a class="cut">-</a><span>' +
      '<input class="toSave" type="text" placeholder="Type...">' +
      '</input>' +
      '</span></td>' +
      '<td><span class="toSave" contenteditable>0</span></td>' +
      '<td><span class="toSave" contenteditable>0</span></td>' +
      '<td><span class="toSave">0</span></td>';
  } else if (invoiceType == 'purchases') {
    emptyRow.innerHTML =
      '<td><a class="cut">-</a><span>' +
      '<input class="itemInput toSave" type="text" list="items" placeholder="Select or search...">' +
      '</input>' +
      '</span></td>' +
      '<td><span>' +
      '<select class="carInput toSave">' +
      '</select>' +
      '</span></td>' +
      '<td><span class="toSave" contenteditable>0</span></td>' +
      '<td><span class="toSave" contenteditable>0</span></td>' +
      '<td><span class="toSave">0</span></td>';
  } else if (invoiceType == 'sales') {
    emptyRow.innerHTML =
      '<td><a class="cut">-</a><span>' +
      '<input class="itemInput toSave" type="text" list="items" placeholder="Select or search...">' +
      '</input>' +
      '</span></td>' +
      '<td><span>' +
      '<select class="carInput toSave">' +
      '</select>' +
      '</span></td>' +
      '<td><span class="toSave" contenteditable>0</span></td>' +
      '<td><span class="toSave" contenteditable>0</span></td>' +
      '<td><span class="toSave">0</span></td>' +
      '<td><span class="toSave">0</span></td>' +
      '<td><span class="toSave">0</span></td>' +
      '<td><span class="toSave">0</span></td>' +
      '<td><span class="toSave">0</span></td>';
  }

  document.getElementById('tableBody').appendChild(emptyRow);

  updateInvoice(getType());
}

// Delete Rows
function deleteRows() {
  const tableBody = document.getElementById('tableBody');
  const tableRows = tableBody.getElementsByTagName('tr');

  for (let i = 1; i < tableRows.length; i++) tableRows[i].remove();
}

// Read Invoice
async function readInvoice(invoiceType) {
  const invoiceNumber = document.getElementById('search').value;

  if (invoiceNumber) {
    try {
      const response = await axios({
        method: 'GET',
        url: `/api/v1/${invoiceType}/invoice/${invoiceNumber}`,
      });

      const data = response.data.data;

      // Alert that No Invoice With This Number
      if (!data)
        showAlert(
          'message',
          `There is no ${invoiceType} invoice with this number! Please enter valid number...`
        );

      // Make Empty Table With Single Row
      deleteRows();

      // Generate Empty Table
      for (let i = 1; i < data.items.length; i++) {
        generateTableRow(invoiceType);
      }

      // Hold Cells From Meta Table and Inventory Table
      const meta = document.getElementsByClassName('meta')[0];
      let metaData = meta.getElementsByClassName('toSave');

      let inventory = document.getElementsByClassName('inventory')[0];
      let inventoryData = inventory.getElementsByClassName('toSave');

      let saveButton = document.getElementById('save');

      // Disable Cut And Add Buttons
      inventory.parentNode.getElementsByClassName('add')[0].style.display =
        'none';

      const cutButtons = inventory.getElementsByClassName('cut');
      for (let i = 0; i < cutButtons.length; i++)
        cutButtons[i].style.display = 'none';

      // Initialize Meta Data
      metaData[0].innerHTML = data.number;

      const fullDate = new Date(data.date);
      const day = fullDate.getDate();
      const month = fullDate.getMonth() + 1;
      const year = fullDate.getFullYear();

      metaData[1].innerHTML = `${day} / ${month} / ${year}`;
      metaData[3].innerHTML = data.total;

      if (invoiceType == 'expenses') {
        saveButton.style.display = 'none';

        metaData[2].disabled = true;
        metaData[2].value = data.spender;

        // Initialize EXPENSES Inventory Data
        for (let i = 0, j = 0; i < inventoryData.length; j++) {
          inventoryData[i].contentEditable = false;
          inventoryData[i++].value = data.items[j].name;

          inventoryData[i].contentEditable = false;
          inventoryData[i++].innerHTML = data.items[j].quantity;

          inventoryData[i].contentEditable = false;
          inventoryData[i++].innerHTML = data.items[j].price;

          inventoryData[i++].innerHTML = data.items[j].total;
        }
      } else if (invoiceType == 'purchases') {
        saveButton.style.display = 'none';

        metaData[2].disabled = true;
        metaData[2].value = data.buyer;

        // Initialize PURCHASES Inventory Data
        for (let i = 0, j = 0; i < inventoryData.length; j++) {
          inventoryData[i].disabled = true;
          inventoryData[i++].value = data.items[j].name;

          inventoryData[i].disabled = true;
          inventoryData[
            i
          ].innerHTML = `<option value='${data.items[j].car}'>${data.items[j].car}</option>`;
          inventoryData[i++].value = data.items[j].car;

          inventoryData[i].contentEditable = false;
          inventoryData[i++].innerHTML = data.items[j].quantity;

          inventoryData[i].contentEditable = false;
          inventoryData[i++].innerHTML = data.items[j].price;

          inventoryData[i++].innerHTML = data.items[j].total;
        }
      } else if (invoiceType == 'sales') {
        metaData[2].disabled = true;
        metaData[2].value = data.seller;

        metaData[4].innerHTML = data.totalProfit;
        // Initialize SALES Inventory Data
        for (let i = 0, j = 0; i < inventoryData.length; j++) {
          inventoryData[i].disabled = true;
          inventoryData[i++].value = data.items[j].name;

          inventoryData[i].disabled = true;
          inventoryData[
            i
          ].innerHTML = `<option value='${data.items[j].car}'>${data.items[j].car}</option>`;
          inventoryData[i++].value = data.items[j].car;

          inventoryData[i++].innerHTML = data.items[j].quantity;

          inventoryData[i].contentEditable = false;
          inventoryData[i++].innerHTML = data.items[j].price;

          inventoryData[i++].innerHTML = data.items[j].total;
          inventoryData[i++].innerHTML = data.items[j].stockQuantity;
          inventoryData[i++].innerHTML = data.items[j].averagePrice;
          inventoryData[i++].innerHTML = data.items[j].stockTotal;
          inventoryData[i++].innerHTML = data.items[j].profit;
        }
      }

      updateInvoice(getType());
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }
}

// Create Expenses Invoice
async function createExpensesInvoice() {
  try {
    // Get Data From Meta Table and Inventory Table
    const meta = document.getElementsByClassName('meta')[0];
    const metaData = meta.getElementsByClassName('toSave');

    const inventory = document.getElementsByClassName('inventory')[0];
    const inventoryData = inventory.getElementsByClassName('toSave');

    let items = [];
    // Initialize Inventory Data
    for (let i = 0; i < inventoryData.length; i += 4) {
      let row = {
        name: inventoryData[i].value,
        quantity: inventoryData[i + 1].innerHTML,
        price: inventoryData[i + 2].innerHTML,
        total: inventoryData[i + 3].innerHTML,
      };
      items.push(row);
    }

    // Initialize Meta Data
    let data = JSON.stringify({
      number: metaData[0].innerHTML,
      date: new Date(),
      spender: metaData[2].value,
      total: metaData[3].innerHTML,
      items: items,
    });

    console.log(data);

    const res = await axios({
      method: 'POST',
      url: '/api/v1/expenses/invoice',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(res);

    if (res.data.status === 'success') {
      // Update Wallet
      const userRes = await axios({
        method: 'GET',
        url: `/api/v1/users/wallet/${metaData[2].value}`,
      });

      let user = userRes.data.data;
      user.wallet -= Number(metaData[3].innerHTML);

      await axios({
        method: 'PATCH',
        url: `/api/v1/users/wallet/${metaData[2].value}`,
        data: user,
      });

      showAlert('success', 'Invoice Saved Successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

// Create Purchases Invoice
async function createPurchasesInvoice() {
  try {
    // Get Data From Meta Table and Inventory Table
    const meta = document.getElementsByClassName('meta')[0];
    const metaData = meta.getElementsByClassName('toSave');

    const inventory = document.getElementsByClassName('inventory')[0];
    const inventoryData = inventory.getElementsByClassName('toSave');

    let items = [];
    // Initialize Inventory Data
    for (let i = 0; i < inventoryData.length; i += 5) {
      let row = {
        name: inventoryData[i].value,
        car: inventoryData[i + 1].value,
        quantity: inventoryData[i + 2].innerHTML,
        price: inventoryData[i + 3].innerHTML,
        total: inventoryData[i + 4].innerHTML,
      };
      items.push(row);
    }

    // Initialize Meta Data
    let data = JSON.stringify({
      number: metaData[0].innerHTML,
      date: new Date(),
      buyer: metaData[2].value,
      total: metaData[3].innerHTML,
      items: items,
    });

    const res = await axios({
      method: 'POST',
      url: '/api/v1/purchases/invoice',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 'success') {
      // Update Wallet
      const userRes = await axios({
        method: 'GET',
        url: `/api/v1/users/wallet/${metaData[2].value}`,
      });

      let user = userRes.data.data;
      user.wallet -= Number(metaData[3].innerHTML);

      await axios({
        method: 'PATCH',
        url: `/api/v1/users/wallet/${metaData[2].value}`,
        data: user,
      });

      // Update Quantity and Average Price For Every Item
      for (let i = 0; i < inventoryData.length; i += 5) {
        const itemRes = await axios({
          method: 'GET',
          url: `/api/v1/items/${inventoryData[i].value}/${
            inventoryData[i + 1].value
          }`,
        });

        let item = itemRes.data.data;

        item.quantity += Number(inventoryData[i + 2].innerHTML);
        item.total += Number(inventoryData[i + 4].innerHTML);
        item.averagePrice = item.total / item.quantity;

        await axios({
          method: 'PATCH',
          url: `/api/v1/items/${inventoryData[i].value}/${
            inventoryData[i + 1].value
          }`,
          data: item,
        });
      }

      showAlert('success', 'Invoice Saved Successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

// Create Sales Invoice
async function createSalesInvoice() {
  try {
    // Get Data From Meta Table and Inventory Table
    const meta = document.getElementsByClassName('meta')[0];
    const metaData = meta.getElementsByClassName('toSave');

    const inventory = document.getElementsByClassName('inventory')[0];
    const inventoryData = inventory.getElementsByClassName('toSave');

    let items = [];
    // Initialize Inventory Data
    for (let i = 0; i < inventoryData.length; i += 9) {
      let row = {
        name: inventoryData[i].value,
        car: inventoryData[i + 1].value,
        quantity: inventoryData[i + 2].innerHTML,
        price: inventoryData[i + 3].innerHTML,
        total: inventoryData[i + 4].innerHTML,
        stockQuantity: inventoryData[i + 5].innerHTML,
        averagePrice: inventoryData[i + 6].innerHTML,
        stockTotal: inventoryData[i + 7].innerHTML,
        profit: inventoryData[i + 8].innerHTML,
      };
      items.push(row);
    }

    // Initialize Meta Data
    let data = JSON.stringify({
      number: metaData[0].innerHTML,
      date: new Date(),
      seller: metaData[2].value,
      total: metaData[3].innerHTML,
      totalProfit: metaData[4].innerHTML,
      items: items,
    });

    const res = await axios({
      method: 'POST',
      url: '/api/v1/sales/invoice',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 'success') {
      // Update Wallet
      const userRes = await axios({
        method: 'GET',
        url: `/api/v1/users/wallet/${metaData[2].value}`,
      });

      let user = userRes.data.data;
      user.wallet += Number(metaData[3].innerHTML);

      await axios({
        method: 'PATCH',
        url: `/api/v1/users/wallet/${metaData[2].value}`,
        data: user,
      });

      // Update Quantity and Average Price For Every Item
      for (let i = 0; i < inventoryData.length; i += 9) {
        const itemRes = await axios({
          method: 'GET',
          url: `/api/v1/items/${inventoryData[i].value}/${
            inventoryData[i + 1].value
          }`,
        });

        let item = itemRes.data.data;

        item.quantity -= Number(inventoryData[i + 2].innerHTML);
        item.total -=
          Number(inventoryData[i + 2].innerHTML) *
          Number(inventoryData[i + 6].innerHTML);

        await axios({
          method: 'PATCH',
          url: `/api/v1/items/${inventoryData[i].value}/${
            inventoryData[i + 1].value
          }`,
          data: item,
        });
      }

      showAlert('success', 'Invoice Saved Successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

// Update Sales Invoice
async function updateSalesInvoice() {
  const invoiceNumber = document.getElementById('search').value;

  if (invoiceNumber) {
    try {
      // Get Native Invoice
      let nativeInvoice = await axios({
        method: 'GET',
        url: `/api/v1/sales/invoice/${invoiceNumber}`,
      });

      nativeInvoice = nativeInvoice.data.data;
      let updatedInvoice = { ...nativeInvoice };

      // Get Data From Meta Table and Inventory Table
      const meta = document.getElementsByClassName('meta')[0];
      const metaData = meta.getElementsByClassName('toSave');

      const inventory = document.getElementsByClassName('inventory')[0];
      const inventoryData = inventory.getElementsByClassName('toSave');

      let items = [];
      // Initialize Inventory Data
      for (let i = 0; i < inventoryData.length; i += 9) {
        let row = {
          name: inventoryData[i].value,
          car: inventoryData[i + 1].value,
          quantity: inventoryData[i + 2].innerHTML,
          price: inventoryData[i + 3].innerHTML,
          total: inventoryData[i + 4].innerHTML,
          stockQuantity: inventoryData[i + 5].innerHTML,
          averagePrice: inventoryData[i + 6].innerHTML,
          stockTotal: inventoryData[i + 7].innerHTML,
          profit: inventoryData[i + 8].innerHTML,
        };
        items.push(row);
      }

      updatedInvoice.total = metaData[3].innerHTML;
      updatedInvoice.totalProfit = metaData[4].innerHTML;
      updatedInvoice.items = items;

      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/sales/invoice/${invoiceNumber}`,
        data: updatedInvoice,
      });

      if (res.data.status === 'success') {
        // Update Wallet
        const userRes = await axios({
          method: 'GET',
          url: `/api/v1/users/wallet/${metaData[2].value}`,
        });

        let user = userRes.data.data;
        user.wallet -= nativeInvoice.total - Number(metaData[3].innerHTML);

        await axios({
          method: 'PATCH',
          url: `/api/v1/users/wallet/${metaData[2].value}`,
          data: user,
        });

        nativeInvoice = nativeInvoice.items;
        // Update Quantity And Stock Total For Every Item
        for (let i = 0, j = 0; i < inventoryData.length; i += 9, j++) {
          const itemRes = await axios({
            method: 'GET',
            url: `/api/v1/items/${inventoryData[i].value}/${
              inventoryData[i + 1].value
            }`,
          });

          let item = itemRes.data.data;

          item.quantity +=
            nativeInvoice[j].quantity - Number(inventoryData[i + 2].innerHTML);
          item.total +=
            (nativeInvoice[j].quantity -
              Number(inventoryData[i + 2].innerHTML)) *
            nativeInvoice[j].averagePrice;

          await axios({
            method: 'PATCH',
            url: `/api/v1/items/${inventoryData[i].value}/${
              inventoryData[i + 1].value
            }`,
            data: item,
          });
        }

        showAlert('success', 'Invoice Updated Successfully!');
        // window.setTimeout(() => {
        //   location.assign('/');
        // }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }
}

// Save Invoice
async function saveInvoice(invoiceType) {
  try {
    const invoiceNumber = document.getElementById('number').innerHTML;

    if (invoiceNumber) {
      const response = await axios({
        method: 'GET',
        url: `/api/v1/${invoiceType}/invoice/${invoiceNumber}`,
      });

      const data = response.data.data;

      // Save OR Update
      if (data) updateSalesInvoice(); // For ThrowBack
      else if (invoiceType == 'expenses') createExpensesInvoice();
      else if (invoiceType == 'purchases') createPurchasesInvoice();
      else if (invoiceType == 'sales') createSalesInvoice();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

// Set Invoice Number
async function setNumber(invoiceType) {
  try {
    if (invoiceType == 'expenses' || 'purchases' || 'sales') {
      let number = document.getElementById('number');

      const response = await axios({
        method: 'GET',
        url: `/api/v1/${invoiceType}/last`,
      });

      const data = response.data.data;

      number.innerHTML = data ? data.number + 1 : 1;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

// Get Now Date For New Invoice
function getNowDate(invoiceType) {
  if (invoiceType == 'expenses' || 'purchases' || 'sales') {
    let date = document.getElementById('date');

    const fullDate = new Date();
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1; // Month starts from 0 (January is 0)
    const year = fullDate.getFullYear();

    date.innerHTML = `${day} / ${month} / ${year}`;
  }
}

// On Click
async function onClick(e) {
  // Remove One Row and Update Invoice
  if (e.target.className == 'cut') {
    let row = e.target.parentNode.parentNode;
    row.parentNode.removeChild(row);

    updateInvoice(getType());
  }
}

// On Change
async function onChange(e) {
  const invoiceType = document
    .getElementsByTagName('h1')[0]
    .innerHTML.split(' ')[0]
    .toLowerCase();

  // Get Cars Avaliable For Current Item
  if (
    e.target.className == 'itemInput toSave' &&
    (invoiceType == 'purchases' || 'sales')
  ) {
    const itemName = e.target.value;

    if (itemName) {
      const response = await axios.get(`/api/v1/items/${itemName}`);

      const carOptions = response.data.data;

      e.target.parentNode.parentNode.parentNode.getElementsByClassName(
        'carInput'
      )[0].innerHTML = carOptions;
    }
  } else if (
    e.target.className == 'carInput toSave' &&
    invoiceType == 'sales'
  ) {
    const itemName =
      e.target.parentNode.parentNode.parentNode.getElementsByClassName(
        'itemInput'
      )[0].value;
    const carName = e.target.value;

    if (carName) {
      const response = await axios.get(`/api/v1/items/${itemName}/${carName}`);

      const item = response.data.data;

      let toSaveCells =
        e.target.parentNode.parentNode.parentNode.getElementsByClassName(
          'toSave'
        );

      toSaveCells[5].innerHTML = item.quantity;
      toSaveCells[6].innerHTML = item.averagePrice;
      toSaveCells[7].innerHTML = item.total;
    }
  }
}

// Select Invoice Type
function getType() {
  return document
    .getElementsByTagName('h1')[0]
    .innerHTML.split(' ')[0]
    .toLowerCase();
}

/* On Content Load
/* ========================================================================== */

function onContentLoad() {
  let currentUrl = window.location.href.split('/');
  currentUrl = currentUrl[currentUrl.length - 1];

  if (currentUrl == 'purchases' || currentUrl == 'sales') {
    createItemsListOnFirstRow();

    document.addEventListener('change', onChange);
  }

  // INVOICE
  if (currentUrl == 'expenses' || 'purchases' || 'sales') {
    updateInvoice(getType());
    setNumber(getType());
    getNowDate(getType());

    document.addEventListener('click', onClick);

    document.addEventListener('wheel', updateNumber);
    document.addEventListener('keydown', updateNumber);
    document.addEventListener('keyup', updateNumber);

    document.getElementById('add').addEventListener('click', () => {
      generateTableRow(getType());
    });

    document.getElementById('save').addEventListener('click', () => {
      saveInvoice(getType());
    });

    document.getElementById('search').addEventListener('change', () => {
      readInvoice(getType());
    });
  }
  // ITEMS
  else if (currentUrl == 'items') {
    // readAllItem(); // To Do

    document.getElementById('save').addEventListener('click', () => {
      // saveItem(); // To Do
    });

    document.getElementById('search').addEventListener('change', () => {
      // readItem(); // To Do // read item and put it in search row and hide save button
    });
  }
  // REPORT
  else if (currentUrl == 'report') {
    // readReport(getType()); // To Do
  }
}

document.addEventListener('DOMContentLoaded', onContentLoad);
