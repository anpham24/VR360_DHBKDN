const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const panoramaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'panoramas'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `pano-${uuidv4()}${ext}`);
  }
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'images'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `img-${uuidv4()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh (jpg, png, webp)'));
  }
};

const uploadPanorama = multer({
  storage: panoramaStorage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

const uploadImage = multer({
  storage: imageStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = { uploadPanorama, uploadImage };
