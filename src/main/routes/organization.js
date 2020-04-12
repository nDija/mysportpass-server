var express = require('express');
var router = express.Router();
var OrganizationController = require('../controllers/OrganizationController.js');

/*
 * GET
 */
router.get('/', OrganizationController.list);

/*
 * GET
 */
router.get('/:id', OrganizationController.show);

/*
 * POST
 */
router.post('/', OrganizationController.create);

/*
 * PUT
 */
router.put('/:id', OrganizationController.update);

/*
 * DELETE
 */
router.delete('/:id', OrganizationController.remove);

module.exports = router;
