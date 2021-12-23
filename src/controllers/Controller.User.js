const User = require('../models/user');

const getAll = (req, res) => {
    User.find({}, { 'token': 0, '_id': 0, 'password': 0 }, (err, users) => {
        return res.send(users);

    })
}

module.exports = {
    getAll,
}