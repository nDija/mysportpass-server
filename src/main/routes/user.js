import Router from 'express';
import UserController from '../controllers/UserController';

const router = Router();

/* GET users listing. */
router.get('/', UserController.findUsers);
router.get('/email/', UserController.findByEmail);

/* add user. */
router.post('/', UserController.createUser);
router.put('/', UserController.updateUser);
module.exports = router;


