const { signToken } = require('../services').auth.JWT;
const { User } = require('../models');
const notificationMailer = require('../services/notification/mailer');

module.exports = {
    /**
     * User sign in controller
     *
     * @endpoint '{host}/api/v1/auth/signin
     */
    signIn: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ 'auth-token': token });
    },

    /**
     * Google oAuth controller
     *
     * @endpoint '{host}/api/v1/auth/google
     */
    googleOauth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ 'auth-token': token });
    },

    /**
     * Facebook oAuth controller
     *
     * @endpoint '{host}/api/v1/auth/facebook
     */
    facebookOauth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ 'auth-token': token });
    },

    /**
     * User email verification controller
     *
     * @endpoint '{host}/api/v1/auth/verify
     */
    verifyEmail: async (req, res, next) => {
        try {
            const { verificationCode } = req.body;
            const user = await User.findOne({
                'local.verificationCode': verificationCode
            });
            if (!user) {
                return res.status(400).json({ message: 'Invalid code' });
            }

            user.isVerified = true;
            user.local.verificationCode = '';
            await user.save();

            res.status(200).json({ message: 'User veified' });
        } catch (err) {
            next(err);
        }
    },

    /**
     * Pasword reset
     *
     * @endpoint '{host}/api/v1/auth/passwordReset
     */
    passwordReset: async (req, res, next) => {
        const { email } = req.body;
        const token = signToken(email);
        console.log(email);
        const mailtemplate = `Password reset link <a href='http://localhost:3000/api/v1/passwordReset?token=${token}'><strong>Reset</strong></a>`;

        try {
            const mailInfo = await notificationMailer.sendMail(
                global.config.EMAIL_FROM,
                req.body.email,
                'Password reset link',
                mailtemplate
            );
            global.log.info(
                `Password reset link email sent, ${JSON.stringify(mailInfo)}`
            );
            res.status(200).json({
                message: 'Password reset link sent to your email'
            });
        } catch (err) {
            next(err);
            global.log.info(`Password reset link email failed, ${err.message}`);
        }
    },

    /**
     * Test auth controller
     *
     * @endpoint '{host}/api/v1/auth/secret
     */
    secret: async (req, res, next) => {
        console.log(req.user);
        res.status(201).json(req.user);
    }
};
