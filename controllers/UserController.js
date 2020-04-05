const UserRepository = require('../models/repositories/UserRepository.js');
//const querystring = require('querystring');

function createUser(req, res) {
    const user = req.body;
    UserRepository.create(user)
        .then((newUser) => {
            res.json(newUser);
        }).catch((errors) => {
            if(errors.code == 11000) {
                console.log(errors);
                res.status(500).json({"msg": "User already exist"});
            } else {
                console.log(errors);
                res.status(500).json(errors);
            }
        });
}

function findByEmail(req, res) {
    const email = req.query.email;
    UserRepository.findByEmail(email)
        .then((user) => {
            res.json(user);
        }).catch((errors) => {
            console.log(errors);
            res.status(500).json(errors);
        });
}

function findUsers(req, res) {
    UserRepository.findAll()
        .then((users) => {
            res.json(users);
        }).catch((errors) => {
        console.log(errors);
        res.status(500).json(errors);
    });
}

module.exports.createUser = createUser;
module.exports.findByEmail = findByEmail;
module.exports.findUsers = findUsers;