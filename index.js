const { json } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');

var users = [
    { id: 1, name: 'alice' }, 
    { id: 2, name: 'bek' }, 
    { id: 3, name: 'chris' }, 
];

app.use(morgan('dev'));

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
