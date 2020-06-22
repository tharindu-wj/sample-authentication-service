const router = require('express').Router();
const { celebrate } = require('celebrate');
const { authSchema } = require('../validation');

const { userController } = require('../controllers');
require('../services/auth/passport');

/**
 * Create user route
 */
router.post('/', [celebrate(authSchema.signup)], userController.create);

module.exports = router;
