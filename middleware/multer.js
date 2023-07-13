const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, 'uploads/images');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const types = ['audio/mpeg', 'image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
