const express = require('express');
const mainController = require('../controllers/maincontroller');

const router = express.Router();
router.get('/user',mainController.getAllUsers);
router.post('/upload',mainController.uploadJob);
router.get('/export',mainController.exportExcel);
module.exports = router;
