# Sample Authentication Service


## Introduction

> This repository contains Authentication micro-service codebase


## Installation

Please refer following steps to run the project in local or development
environment. First clone the project form this repository then run following
commands.

> Create `.env` file with configs from `.env.example`

```sh
$ npm install
$ npm run dev
```

Then application will successfully run on your local environment.
[http://localhost:3000](http://localhost:3000)


## Deployment

This service integrated with serverless framework lambda support. `https://serverless.com/`

```sh
$ sls deploy
```


## Code/Folder Structure

This application contains following code/folder structure.

-   `bootloaders/` – booting logic based on the environment
-   `bootloaders/express.js` – booting logic for express - Development purpose
-   `bootloaders/lambda.js` – booting logic for lambda and express - For Production
-   `config/` – 
-   `controllers/` – 
-   `middlewares/` – 
-   `models/` – 
-   `routes/` – 
-   `services/` – 
-   `validation/` – 
-   `.env.example/` – contains all the config configuration.
-   `app.js` – initializes the app and glues everything together
-   `package.json` – remembers all packages that your app depends on and their versions
-   `.eslintrc` – EsLint configuration file