const authRoutes = require('./auth');
const userRoutes = require('./user');

module.exports = app => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', userRoutes);
};
