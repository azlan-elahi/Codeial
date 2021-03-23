const Post = require('../models/post');

module.exports.create = function (req, res) {
    console.log(req.body);
    console.log(req.user._id);
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) { console.log("Error in creating Post!!"); return; }
        return res.redirect('back');
    }
    )
};