const { json } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

var users = [
    { id: 1, name: 'alice' }, 
    { id: 2, name: 'bek' }, 
    { id: 3, name: 'chris' }, 
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function(req, res) {
    const paramLimit = req.query.limit || 10;
    const paramOffset = req.query.offset || 0;
    const limit = parseInt(paramLimit);
    const offset = parseInt(paramOffset);

    if (Number.isNaN(limit) || Number.isNaN(offset)) {
        return res.status(400).end();
    }

    res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400)
            .end();
    }

    const user = users.filter((user) => {
        return user.id === id
    })[0];

    if (!user) {
        return res.status(404)
            .end();
    }

    res.json(user);
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    
    if (name === undefined) {
        return res.status(400)
            .end();
    }

    const user = users.filter((user) => {
        return user.name === name;
    })[0];

    if (user) {
        return res.status(409)
            .end();
    }

    const id = Date.now();
    const newUser = {id, name};
    res.status(201)
        .json(newUser);
});

app.delete('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400)
            .end();
    }

    users = users.filter(user => user.id !== id);

    res.status(204)
        .end();
});

app.listen(3000, function() {
    return 'server is running';
});

module.exports = app;
