const multer = require('multer');
const fs = require('fs');

const uploadDir = "uploads/";

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// for making sub dir if not exists
function createDirIfNot(dir){
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

// making file names
function generateFileName(file){
    return Date.now() + '.' + file.originalname;
}

const userAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        const avatarDir = 'uploads/avatars/';
        createDirIfNot(avatarDir);
        cb(null, avatarDir);
    },
    filename: (req, file, cb) => {
        const avatar = generateFileName(file);
        cb(null, avatar);
    }
});


const avatarUpload = multer({storage: userAvatar});

module.exports = {
    avatarUpload,
};