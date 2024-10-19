import multer from 'multer';
import path from 'path';
require('dotenv').config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("check req:", req.body);
        // console.log("check cb:", cb);
        cb(null, path.join(__dirname, '../assets/image'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
})

const upload = multer({ storage: storage });

export default upload;