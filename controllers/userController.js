const { signToken } = require('../services').auth.JWT;
const { User } = require('../models');
const notificationMailer = require('../services/notification/mailer');

module.exports = {
    /**
     * Create new user
     *
     * @endpoint {host}/api/v1/auth/user
     */
    create: async (req, res, next) => {
        const { username, password } = req.body;

        try {
            const foundUser = await User.findOne({
                'local.username': username
            });
            if (foundUser) {
                return res.status(403).json({ message: 'Username exists' });
            }

            const verificationCode = Math.floor(
                100000 + Math.random() * 900000
            );
            console.log(verificationCode);

            const newUser = await new User({
                name: req.body.name,
                email: req.body.email,
                birthday: req.body.birthday,
                gender: req.body.gender,
                mobile: req.body.mobile,
                address: req.body.address,
                isAnonymous: req.body.isAnonymous,
                method: 'local',
                local: {
                    username,
                    password,
                    verificationCode
                }
            }).save();

            const mailtemplate = `Your verification code <strong>${verificationCode}</strong>`;

            try {
                const mailInfo = await notificationMailer.sendMail(
                    global.config.EMAIL_FROM,
                    req.body.email,
                    'Email Verification Code',
                    mailtemplate
                );
                global.log.info(
                    `User verification email sent, ${JSON.stringify(mailInfo)}`
                );
            } catch (err) {
                global.log.info(
                    `User verification email failed, ${err.message}`
                );
            }

            const token = signToken(newUser);
            res.status(201).json({ 'auth-token': token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
};
