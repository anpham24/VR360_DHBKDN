const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadPanorama, uploadImage } = require('../middleware/upload');
const tourCtrl = require('../controllers/tourController');
const locationCtrl = require('../controllers/locationController');
const sceneCtrl = require('../controllers/sceneController');
const hotspotCtrl = require('../controllers/hotspotController');

router.use(auth);

// Dashboard
router.get('/dashboard', async (req, res) => {
  const db = require('../config/db');
  try {
    const [[tours]] = await db.query('SELECT COUNT(*) as count FROM tours');
    const [[locations]] = await db.query('SELECT COUNT(*) as count FROM locations');
    const [[scenes]] = await db.query('SELECT COUNT(*) as count FROM scenes');
    const [[hotspots]] = await db.query('SELECT COUNT(*) as count FROM hotspots');
    res.json({
      tours: tours.count,
      locations: locations.count,
      scenes: scenes.count,
      hotspots: hotspots.count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tours CRUD
router.post('/tours', tourCtrl.create);
router.put('/tours/:id', tourCtrl.update);
router.delete('/tours/:id', tourCtrl.delete);

// Locations CRUD
router.post('/locations', locationCtrl.create);
router.put('/locations/:id', locationCtrl.update);
router.delete('/locations/:id', locationCtrl.delete);

// Scenes CRUD
router.post('/scenes', sceneCtrl.create);
router.put('/scenes/:id', sceneCtrl.update);
router.delete('/scenes/:id', sceneCtrl.delete);

// Hotspots CRUD
router.post('/hotspots', hotspotCtrl.create);
router.put('/hotspots/:id', hotspotCtrl.update);
router.delete('/hotspots/:id', hotspotCtrl.delete);

// Upload
router.post('/upload/panorama', uploadPanorama.single('panorama'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Không có file' });
  res.json({ url: `/uploads/panoramas/${req.file.filename}` });
});

router.post('/upload/image', uploadImage.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Không có file' });
  res.json({ url: `/uploads/images/${req.file.filename}` });
});

module.exports = router;
