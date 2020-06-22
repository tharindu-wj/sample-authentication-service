/**
 * @file Main entry point for connect serverless framework to Express. This use in production env.
 */

const awsServerlessExpress = require('aws-serverless-express');
const app = require('../app');

const server = awsServerlessExpress.createServer(app);
module.exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
