const JWT = require('jsonwebtoken');

module.exports = {
    /**
     * Create JWT token with user id
     * 
     * @param {user} user model
     */
    signToken: user => {
        return JWT.sign(
            {
                iss: 'authService',
                sub: user,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            global.config.JWT_SECRET
        );
    }
};
