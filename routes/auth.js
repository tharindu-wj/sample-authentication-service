const router = require('express').Router();
const { celebrate } = require('celebrate');
const { authSchema } = require('../validation');

const { authMiddlware } = require('../middlewares');
const { authController } = require('../controllers');
require('../services/auth/passport');

/**
 * User sign in route
 */
router.post(
    '/signin',
    [celebrate(authSchema.signin), authMiddlware.signIn],
    authController.signIn
);

/**
 * Google oAuth route
 */
router.post('/google', authMiddlware.google, authController.googleOauth);

/**
 * Facebook oAuth route
 */
router.post('/facebook', authMiddlware.facebook, authController.facebookOauth);

/**
 * User email verification route
 */
router.post(
    '/verifyEmail',
    [celebrate(authSchema.verfyEmail)],
    authController.verifyEmail
);

/**
 * Password reset
 */
router.post(
    '/passwordReset',
    [celebrate(authSchema.passwordReset)],
    authController.passwordReset
);

/**
 * Test auth route
 */
router.get('/secret', authMiddlware.jwt, authController.secret);

module.exports = router;
