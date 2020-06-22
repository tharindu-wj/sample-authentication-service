const nodemailer = require('nodemailer');

const options = {
    service: global.config.EMAIL_SERVICE,
    host: global.config.EMAIL_HOST,
    auth: {
        user: global.config.EMAIL_USER,
        pass: global.config.EMAIL_PASSWORD
    }
};

const transport = nodemailer.createTransport(options);

module.exports = {
    /**
     * Send email
     */
    sendMail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, to, subject, html }, (err, info) => {
                if (err) reject(err);
                console.log(info);
                resolve(info);
            });
        });
    }
};
