import CoachRepository from '../models/repositories/CoachRepository';
import logger from '../log';

/**
 * CoachController.js
 *
 * @description :: Server-side logic for managing Coaches.
 */
const CoachController = {

    create(req, res) {
        logger.debug(JSON.stringify(req.body));
        CoachRepository.create(req.body)
            .then((newCoach) => {
                res.json(newCoach);
            }).catch((error) => {
            if (error.code == 11000) {
                logger.error(`${error.message}`);
                logger.error(`${error.stack}`);
                res.status(500).json({"msg": "Coach already exist"});
            } else {
                logger.error(error);
                res.status(500).json('an error has occurred');
            }
        });
    },

    /**
     * CoachController.list()
     */
    list(req, res) {
        CoachRepository.find()
            .then((coaches) => {
                res.json(coaches);
            }).catch((error) => {
                logger.error(error);
                res.status(500).json({
                    message: 'Error when getting Coaches.',
                    error: error
                });
            });
    }
}

export default CoachController;