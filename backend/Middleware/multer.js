const multer=require('multer')
const path=require("path")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Create an instance of multer with the defined storage
const upload = multer({ storage: storage });
module.exports=upload