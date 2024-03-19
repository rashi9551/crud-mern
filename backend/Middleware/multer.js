const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Resolve the destination path relative to the directory of multer.js
    const destinationPath = path.join(__dirname, '../uploads');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
