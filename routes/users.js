import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

/* GET users listing. */
router.get('/', UserController.findUsers);
router.get('/email/', UserController.findByEmail);

/* add user. */
router.post('/', UserController.createUser);

module.exports = router;


