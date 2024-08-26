const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dbConfig')

const app = express();

app.use(cors());
app.use(express.json())

const routes = require('./routes/expensesRoutes');

app.use('/api', routes);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('Listening on port 4000');
    });
    console.log('Conectado ao banco de dados');
}).catch((error) => {
    console.log('Erro ao conectar ao banco de dados', error.message);
})

