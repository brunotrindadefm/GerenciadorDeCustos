const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

const routes = require('./routes');

app.use(routes);

app.get('/', (req,res) => {
    res.send('Hello, world!!');
});

app.listen(4000, (req,res) => {
    console.log('Listening on port 4000');
});