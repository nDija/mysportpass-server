import Router from 'express';
import OrganizationController from '../controllers/OrganizationController.js';

const router = Router();

/*
 * GET
 */
router.get('/', OrganizationController.list);

/* add user. */
router.post('/', OrganizationController.create);

module.exports = router;
