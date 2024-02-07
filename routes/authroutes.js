const express = require('express');
const mainController = require('../controllers/maincontroller');
const JWTUtils = require('../utils/jwtutils')

const router = express.Router();
router.get('/user',mainController.getAllUsers);
router.post('/upload',mainController.cronjob);
router.get('/export',mainController.exportExcel);
module.exports = router;