const express = require('express');
const UserController = require('../controllers/UserController');

var router = express.Router();

/* GET users listing. */
router.get('/', UserController.findUsers);
router.get('/email/', UserController.findByEmail);
/* add user. */
router.post('/', UserController.createUser);

module.exports = router;


