const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


/* Get data which was created every second by cron. */
router.get('/', indexController.index);

module.exports = router;
