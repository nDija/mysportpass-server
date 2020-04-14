import Router from 'express';
import OrganizationController from '../controllers/OrganizationController';

const router = Router();

/*
 * GET
 */
router.get('/', OrganizationController.list);

/* add user. */
router.post('/', OrganizationController.create);

export default router;
