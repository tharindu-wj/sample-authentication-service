const passport = require('passport');
require('../services/auth/passport');

module.exports = {
    /**
     * Passport jwt token verify middleware
     */
    jwt: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, function(
            err,
            user,
            info
        ) {
            req.user = user;
            next();
        })(req, res, next);
    },

    /**
     * Passport username & password verify middleware
     */
    signIn: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (err, user, info) => {
                if (user) {
                    next();
                } else {
                    res.status(403).json({
                        message: info.message
                    });
                }
            }
        )(req, res, next);
    },

    /**
     * Passport google middleware
     */
    google: (req, res, next) => {
        passport.authenticate(
            'googleToken',
            { session: false },
            (err, user, info) => {
                if (err) {
                    res.status(403).json({
                        message: err.message
                    });
                } else {
                    next();
                }
            }
        )(req, res, next);
    },

    /**
     * Passport facebook middleware
     */
    facebook: (req, res, next) => {
        passport.authenticate(
            'facebookToken',
            { session: false },
            (err, user, info) => {
                if (err) {
                    res.status(403).json({
                        message: err.message
                    });
                } else {
                    next();
                }
            }
        )(req, res, next);
    }
};
