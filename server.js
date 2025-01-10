const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const db = require('./db');
const reservations = require('./routes/reservations');
const halls = require('./routes/halls');
const users = require('./routes/users');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/reservations', reservations);
app.use('/api/halls', halls);
app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});