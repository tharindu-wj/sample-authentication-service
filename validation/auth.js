const { Joi } = require('celebrate');

module.exports = {
    signup: {
        body: {
            username: Joi.string()
                .required()
                .min(4)
                .max(25),
            password: Joi.string()
                .alphanum()
                .min(4)
                .max(25)
                .required(),
            name: Joi.string(),
            email: Joi.string().email(),
            birthday: Joi.string().isoDate(),
            gender: Joi.string(),
            mobile: Joi.string(),
            address: Joi.string(),
            isAnonymous: Joi.string()
        }
    },
    signin: {
        body: {
            username: Joi.string()
                .required()
                .min(4)
                .max(25),
            password: Joi.string()
                .alphanum()
                .min(4)
                .max(25)
                .required()
        }
    },
    verfyEmail: {
        body: {
            verificationCode: Joi.string().required()
        }
    },
    passwordReset: {
        body: {
            email: Joi.string()
                .email()
                .required()
        }
    }
};
