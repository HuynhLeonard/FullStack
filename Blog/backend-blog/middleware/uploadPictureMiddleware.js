import multer from "multer";
import path from 'path';
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create a place to store media
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, "../uploads"));
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1000000   //1MB
    },
    fileFilter: function(req,file,cb) {
        let ext = path.extname(file.originalname);
        // check file extension
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error("Only images are allowed!"));
        }
        cb(null, true);
    }
});

export {uploadPicture};