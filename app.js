// env variables:  MONGO_URI, JWT_SECRET, JWT_LIFETIME 
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//connectDB function which returns the promise when connected
const connectDB = require('./db/connect');

//middleware to return a 404 status with message: URL NOT FOUND
const notFound = require('./errors/notFound');

const errorHandler = require('./middleware/errorHandler');

//checks for the jwt token, if valid then sets userId and name in user object accessible in req
const authorization = require('./middleware/Authorization');

//routers for auth and contacts
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