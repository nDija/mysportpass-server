import Router from 'express';
import SubscriptionController from '../controllers/SubscriptionController';

const router = Router();

/*
 * GET
 */
router.get('/', SubscriptionController.list);

/* add user. */
router.post('/', SubscriptionController.create);

export default router;
