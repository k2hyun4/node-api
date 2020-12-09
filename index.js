const express = require('express');
const morgan = require('morgan');
const app = express();

function commonMiddleware(req, res, next) {
    console.log('common middleware');
    next(new Error('Error occuered'));
}

function errorMiddleware(err, req, res, next) {
    console.log(err.message);
    next();
}

function logger(req, res, next) {
    console.log('i am logger');
    next();
}

function logger2(req, res, next) {
    console.log('i am logger2');
    next();
}


app.use(logger);
app.use(commonMiddleware);
app.use(errorMiddleware);
app.use(logger2);
app.use(morgan('dev'));

app.listen(3000, function() {
    console.log(`Server is running in port ${3000}`);
})