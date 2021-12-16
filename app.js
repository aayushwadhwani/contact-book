require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const connectDB = require('./db/connect');
const notFound = require('./errors/notFound');
const errorHandler = require('./middleware/errorHandler');

const authorization = require('./middleware/Authorization');
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/contact',authorization,contactsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async() => {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();