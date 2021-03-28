const { localsName } = require('ejs');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
    console.log("controller loaded for creating post");
    console.log(req.body);
    console.log(req.user._id);
    console.log(req.user.name);
    console.log("if se phlle");
    // if (localsName.user) {
    //     console.log("if ke andr");
    //     Post.create({
    //         content: req.body.content,
    //         user: req.user._id
    //     }, function (err, post) {
    //         if (err) { console.log("Error in creating Post!!"); return; }
    //         return res.redirect('back');
    //     }
    //     )
    // }
    if (req.user.name) {
        console.log("if ke andr");
        Post.create({
            content: req.body.content,
            user: req.user._id
        }, function (err, post) {
            if (err) { console.log("Error in creating Post!!"); return; }
            return res.redirect('back');
        }
        )
    }
};

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        // .id means converting the obj id into string automatically by mongoose
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    })
}