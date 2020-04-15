import UserRepository from '../models/repositories/UserRepository';
import logger from '../log'

const UserController = {
    create(req, res) {
        logger.debug(JSON.stringify(req.body));
        UserRepository.create(req.body)
            .then((newUser) => {
                res.json(newUser);
            }).catch((error) => {
                if (error.code == 11000) {
                    logger.error(error);
                    res.status(500).json({"msg": "User already exist"});
                } else {
                    logger.error(error);
                    res.status(500).json(error);
                }
        });
    },

    update(req, res) {
        UserRepository.findOneAndUpdate(req.body)
            .then((updatedUser) => {
                res.json(updatedUser);
            }).catch((error) => {
                if (error.code == 11000) {
                    logger.error(error);
                    res.status(500).json({"msg": "User already exist"});
                } else {
                    logger.error(error);
                    res.status(500).json(error);
                }
        });
    },

    findByEmail(req, res) {
        const email = req.query.email;
        UserRepository.findByEmail(email)
            .then((user) => {
                res.json(user);
            }).catch((error) => {
                logger.error(error);
                res.status(500).json(error);
            });
    },

    list(req, res) {
        UserRepository.findAll()
            .then((users) => {
                res.json(users);
            }).catch((error) => {
                logger.error(error);
                res.status(500).json(error);
            });
    }
}

export default UserController;