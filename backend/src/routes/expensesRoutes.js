const express = require('express')
const routes = express.Router();
const expensesController = require('../controllers/expensesController');

routes.get('/expenses', expensesController.getExpenses);
routes.post('/expenses', expensesController.createExpense);
routes.delete('/expenses/:id', expensesController.deleteExpense);
routes.put('/expenses/:id', expensesController.updateExpense);

module.exports = routes