const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true //for auto created two fields "createdAt"  and "updatedAt" time
}
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

