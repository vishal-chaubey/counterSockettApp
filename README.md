# counterSocketApp

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API docs can see](#API-docs-can-see)

## General info
This Project consist of
* App that create entry every second in DB (Mongodb) by cron job
* Send notification by socket while creating entry in db 
* API to get all created data, 
* API documentation on swagger 
* Test cases for each functions
	
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
