const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/avif': 'avif'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination directory
  },
  filename: (req, file, cb) => {
    const ext = FILE_TYPE_MAP[file.mimetype];
    if (!ext) {
      return cb(new Error('Invalid file type'));
    }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + ext;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (FILE_TYPE_MAP[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
