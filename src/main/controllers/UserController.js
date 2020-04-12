import UserRepository from '../models/repositories/UserRepository.js';

const UserController = {
    createUser(req, res) {
        //loggerW.debug(user);
        UserRepository.create(req.body)
            .then((newUser) => {
                res.json(newUser);
            }).catch((errors) => {
            if (errors.code == 11000) {
                console.log(errors);
                res.status(500).json({"msg": "User already exist"});
            } else {
                console.log(errors);
                res.status(500).json(errors);
            }
        });
    },

    updateUser(req, res) {
        UserRepository.findOneAndUpdate(req.body)
            .then((updatedUser) => {
                res.json(updatedUser);
            }).catch((errors) => {
            if (errors.code == 11000) {
                console.log(errors);
                res.status(500).json({"msg": "User already exist"});
            } else {
                console.log(errors);
                res.status(500).json(errors);
            }
        });
    },

    findByEmail(req, res) {
        const email = req.query.email;
        UserRepository.findByEmail(email)
            .then((user) => {
                res.json(user);
            }).catch((errors) => {
            console.log(errors);
            res.status(500).json(errors);
        });
    },

    findUsers(req, res) {
        UserRepository.findAll()
            .then((users) => {
                res.json(users);
            }).catch((errors) => {
            console.log(errors);
            res.status(500).json(errors);
        });
    }}

export default UserController;