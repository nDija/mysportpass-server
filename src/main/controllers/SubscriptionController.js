import SubscriptionRepository from '../models/repositories/SubscriptionRepository';
import logger from '../log';

/**
 * SubscriptionController.js
 *
 * @description :: Server-side logic for managing Subscriptions.
 */
const OrganizationController = {

    create(req, res) {
        logger.debug(JSON.stringify(req.body));
        SubscriptionRepository.create(req.body)
            .then((newSubscription) => {
                res.json(newSubscription);
            }).catch((error) => {
            if (error.code == 11000) {
                logger.error(`${error.message}`);
                logger.error(`${error.stack}`);
                res.status(500).json({"msg": "Subscription already exist"});
            } else {
                logger.error(error);
                res.status(500).json('an error has occurred');
            }
        });
    },

    /**
     * SubscriptionController.list()
     */
    list(req, res) {
        SubscriptionRepository.find()
            .then((subscriptions) => {
                res.json(subscriptions);
            }).catch((error) => {
            res.status(500).json({
                message: 'Error when getting Subscription.',
                error: error
            });
        });
    }
}

export default OrganizationController;