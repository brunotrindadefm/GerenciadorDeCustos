const Expense = require('../models/expensesModel');

const createExpense = async (req, res) => {
    try {

        const { category, description, value, date, transactionType } = req.body;
        await Expense.create({ category, description, value, date, type: transactionType });
        res.status(201).send('Receita criada com sucesso!')

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erro interno no servidor')
    }
};

const getExpenses = async (req, res) => {
    try {

        const expenses = await Expense.findAll();
        res.json(expenses);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erro interno no servidor');
    }
};

const deleteExpense = async (req, res) => {
    try {

        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        if (!expense) return res.status(404).send('Erro. Receita não encontrada.');
        await expense.destroy();
        res.status(200).send('Receita deletado com sucesso!')

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erro interno no servidor');
    }
};

const updateExpense = async (req, res) => {
    try {

        const { category, description, value, date, type } = req.body;
        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        if (!expense) return res.status(404).send('Erro. Receita não encontrada.');
        await expense.update({ category, description, value, date, type });
        res.status(200).send('Receita editada com sucesso!')

    }  catch (error) {
        console.log(error.message);
        res.status(500).send('Erro interno no servidor');
    }
};

module.exports = {
    getExpenses,
    updateExpense,
    createExpense,
    deleteExpense
};