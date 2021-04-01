const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true //for created at and update time
}
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH)); //they're like user.js + .. + uploads/users/avatar
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//static functions
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar'); //.single means only single file can be uploaded
userSchema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', userSchema);
module.exports = User;

