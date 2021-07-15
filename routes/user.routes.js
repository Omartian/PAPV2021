'use strict';

const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/login')
    .post(userController.usuarioLogin)

router.route('/addUser')
    .post(userController.addUser)

router.route('/allLogins')
    .get(userController.getAllUsers)

router.route('/singleUser/:id')
    .get(userController.singleUserByID)

router.route('/deleteSingleUser/:id')
    .delete(userController.deleteSingleUserByID)

router.route('/updateSingleUser/:id')
    .patch(userController.patchSingleUserByID)


module.exports = router;