import UserRepository from '../models/repositories/UserRepository.js';

class UserController {

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
    }

    findByEmail(req, res) {
        const email = req.query.email;
        UserRepository.findByEmail(email)
            .then((user) => {
                res.json(user);
            }).catch((errors) => {
            console.log(errors);
            res.status(500).json(errors);
        });
    }

    findUsers(req, res) {
        new UserRepository().findAll()
            .then((users) => {
                res.json(users);
            }).catch((errors) => {
            console.log(errors);
            res.status(500).json(errors);
        });
    }
}
export default UserController = new UserController();