var users = [
    { id: 1, name: 'alice' }, 
    { id: 2, name: 'bek' }, 
    { id: 3, name: 'chris' }, 
];

const index = function(req, res) {
    const paramLimit = req.query.limit || 10;
    const paramOffset = req.query.offset || 0;
    const limit = parseInt(paramLimit);
    const offset = parseInt(paramOffset);

    if (Number.isNaN(limit) || Number.isNaN(offset)) {
        return res.status(400).end();
    }

    res.json(users.slice(0, limit));
};

const show = function(req, res) {
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
};

const create = (req, res) => {
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
};

const destroy = function(req, res) {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400)
            .end();
    }

    users = users.filter(user => user.id !== id);

    res.status(204)
        .end();
};

module.exports = {
    index, 
    show, 
    create, 
    destroy
}