import Router from 'express';
import CoachController from '../controllers/CoachController';

const router = Router();

/*
 * GET
 */
router.get('/', CoachController.list);

/* add user. */
router.post('/', CoachController.create);

export default router;
