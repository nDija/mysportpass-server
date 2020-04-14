import Router from 'express';
import UserController from '../controllers/UserController';

const router = Router();

/* GET users listing. */
router.get('/', UserController.list);
router.get('/email/', UserController.findByEmail);

/* add user. */
router.post('/', UserController.create);
router.put('/', UserController.update);

export default router;


