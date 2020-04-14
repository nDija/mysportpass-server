import UserRepository from '../models/repositories/UserRepository';
import logger from '../log'

const UserController = {
    create(req, res) {
        logger.debug(JSON.stringify(req.body));
        UserRepository.create(req.body)
            .then((newUser) => {
                res.json(newUser);
            }).catch((errors) => {
            if (errors.code == 11000) {
                logger.error(errors);
                res.status(500).json({"msg": "User already exist"});
            } else {
                logger.error(errors);
                res.status(500).json(errors);
            }
        });
    },

    update(req, res) {
        UserRepository.findOneAndUpdate(req.body)
            .then((updatedUser) => {
                res.json(updatedUser);
            }).catch((errors) => {
            if (errors.code == 11000) {
                logger.error(errors);
                res.status(500).json({"msg": "User already exist"});
            } else {
                logger.error(errors);
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
            logger.error(errors);
            res.status(500).json(errors);
        });
    },

    list(req, res) {
        UserRepository.findAll()
            .then((users) => {
                res.json(users);
            }).catch((errors) => {
            logger.error(errors);
            res.status(500).json(errors);
        });
    }}

export default UserController;