import UserRepository from '../models/repositories/UserRepository.js';
import User from '../models/User.js';

const UserController = {
    createUser(req, res) {
        const user = req.body;
        UserRepository.create(user)
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

    findByEmail(req, res) {
        const email = req.query.email;
        new UserRepository(User).findByEmail(email)
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