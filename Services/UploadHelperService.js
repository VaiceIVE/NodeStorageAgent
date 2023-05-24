const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Storage/')
    },
    filename: (req, file, cb) => {
        cb(null, file.type + "_" + file.originalname)
    }
});

const upload = multer({ storage: storage }); 

module.exports = upload;