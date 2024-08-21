const express = require('express');
const routes = express.Router();

require('dotenv').config();
// Importa o pacote mysql2, que permite a conexão e a interação com o banco de dados MySQL.
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
});


// Testar conexão
db.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como id ' + db.threadId);
});

routes.post('/expenses', (req, res) => {
    const { category, description, value, date, transactionType } = req.body;

    const query = 'INSERT INTO expenses (category, description, value, date, type) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [category, description, value, date, transactionType], (error, results) => {
        if (error) res.status(500).send('Erro ao inserir a receita.');

        res.status(201).send('Receita inserida com sucesso!');
    });
});

routes.get('/expenses', (req, res) => {
    const query = 'SELECT * FROM expenses';
    db.query(query, (error, results) => {
        if (error) res.status(500).send('Erro ao consultar despesas.');

        res.json(results);
    })
});

routes.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM expenses WHERE id = ?';
    db.query(query, [id], (error, response) => {
        if (error) res.status(500).send('Erro. Não foi possível deletar receita');

        if (response.affectedRows === 0) {
            return res.status(404).send('Despesa não encontrada.');
        }

        res.status(200).send('Receita deletada com sucesso!');
    });
});

routes.put('/expenses/:id', (req, res) => {
    const { category, description, value, date, type } = req.body;    
    const { id } = req.params;

    console.log( { id, category, description, value, date, type });
    const query = 'UPDATE expenses SET CATEGORY = ?, DESCRIPTION = ?, VALUE = ?, DATE = ?,  TYPE = ? WHERE ID = ?';

    db.query(query, [category, description, value, date, type, id], (error, response) => {
        console.log(response)
        console.log(error)
        if (error) res.status(500).send('Erro ao editar os dados');

        res.status(200).send('Dados editados com sucesso!');
    })

});

module.exports = routes;