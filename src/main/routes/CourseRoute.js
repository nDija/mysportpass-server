import Router from 'express';
import CourseController from '../controllers/CourseController';

const router = Router();

/*
 * GET
 */
router.get('/', CourseController.list);

/* add user. */
router.post('/', CourseController.create);

export default router;
