require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.ENV || 'dev',

    MONGO_URL: process.env.MONGO_URL,

    JWT_SECRET: 'adbasfhbbfsiubfdiuibregiuberuigb',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM
};
