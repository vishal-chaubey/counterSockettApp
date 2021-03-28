# counterSockettApp

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API docs can see](#API-docs-can-see)

## General info
This is a dummy project that create entry every second in DB (Mongodb) by cron job and also send notification by socket while creating entry in db and craeted a get api to see all created data, can be see API docs on swagger (As swagger added for API docs in this project) also written test cases for functions
	
## Technologies
Project is created with:
* NodeJS, : 14.*.*
* MongoDB: 4.1.0
* Express

### Dependencies
* Socket
* Cron
* Mocha/chai
* Swagger
	
## Setup
To run this project, install it locally using npm:

```
$ cd ../counterSockettApp
$ npm install
$ npm start  (Run the project)
$ npm run test (For test cases)
```

## API docs can see
* http://localhost:3001/api (port as per defined in .env)
