const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const reservations = require('./routes/reservations');
const halls = require('./routes/halls');
const users = require('./routes/users');
const roles = require('./routes/roles');
const reservationStatuses = require('./routes/reservationStatuses');
const auth = require('./routes/auth');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/reservations', reservations);
app.use('/api/halls', halls);
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/reservation_statuses', reservationStatuses);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});