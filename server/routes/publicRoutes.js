const express = require('express');
const router = express.Router();
const tourCtrl = require('../controllers/tourController');
const locationCtrl = require('../controllers/locationController');
const sceneCtrl = require('../controllers/sceneController');

router.get('/tours', tourCtrl.getAll);
router.get('/tours/:id', tourCtrl.getById);
router.get('/locations/:id', locationCtrl.getById);
router.get('/scenes/:id', sceneCtrl.getById);

module.exports = router;
