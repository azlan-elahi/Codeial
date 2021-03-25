const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log("error to find post");
                }
                else {
                    //comment add to respective post meand UPDATION in DB
                    post.comments.push(comment);
                    post.save(); //save tells the db this is final version to store in db because before save it's in RAM
                    res.redirect('/');
                }
            })
        }
    });
}