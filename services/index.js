const authJwt = require('./auth/jwt');
const authPassport = require('./auth/passport');

const notificationMailer = require('./notification/mailer');

module.exports = {
    auth: {
        JWT: authJwt,
        passport: authPassport
    },
    notification: {
        mailer: notificationMailer
    }
};
