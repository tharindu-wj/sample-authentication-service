/**
 * @file Main entry point for the application. This file mainly use for running this application local environment as a Express project.
 */

const app = require('../app');

// Start expres server
const port = global.config.PORT;
app.listen(port, () => {
    console.log(`Server listing on port: ${port}`);
});