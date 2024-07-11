const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { connect } = require('./configurations/database');

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const taskRoutes = require('./routes/task');

const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Task Manager API' });
});

app.use(userRoutes);
app.use('/categories', categoryRoutes);
app.use('/tasks', taskRoutes);

app.use(error.notFound);

connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});