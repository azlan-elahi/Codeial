const { localsName } = require('ejs');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    console.log("User controller loaded for action creating post");
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
    //without async action
    // if (req.user.name) {
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

    // with async keyword
    try {
        if (req.user.name) {
            await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            req.flash('success', 'Post published!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log("Error in creating Post!"); return;
    }
};

//witohut use async and await
// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         // .id means converting the obj id into string automatically by mongoose
//         console.log("For deleting post action caller");
//         if (post.user == req.user.id) {
//             post.remove();
//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });
//         }
//         else {
//             return res.redirect('back');
//         }
//     })
// }

//with async keyword
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        console.log("For deleting post action caller");
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');
        }
        else {
            req.flash('error', 'You can not delete this post');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log("Error while deleting Post ", err); return;
    }
};