'use strict';

const router = require('express').Router();
const rutesController = require('../controllers/rutes.controller');

router.route('/getRoute')
    .post(rutesController.nearestRoute)

module.exports = router;