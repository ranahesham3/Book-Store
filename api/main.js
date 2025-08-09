const path = require('path');

const roleRouter = require('./routes/role');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
const cartRouter = require('./routes/cart');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//environment varaibles
dotenv.config({ path: './.env' });
const api = process.env.API_URL || '/api/v1';

const app = express();
//Middleware
app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Routes
app.use(`${api}/role`, roleRouter);
app.use(`${api}/auth`, authRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/book`, bookRouter);
app.use(`${api}/cart`, cartRouter);

//Error handler middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const objMsg = obj.message || 'Something went wrong';
    return res.status(statusCode).json({
        success: !(
            `${statusCode}`.startsWith('5') || `${statusCode}`.startsWith('4')
        ),
        message: objMsg,
    });
});

//------------------------------------------------------------
//connect to DB
const DB = process.env.MONGOOSE_URL.replace(
    '<PASSWORD>',
    process.env.MONGOOSE_PASSWORD
);
mongoose
    .connect(DB)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(8080, () => {
    console.log('working on server with port 8080');
});
