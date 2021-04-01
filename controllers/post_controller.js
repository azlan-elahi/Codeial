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
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            //just check req is xhr then return JSON
            if (req.xhr) {
                console.log("AJAX");
                return res.status(200).json({
                    data: {
                        post: post
                    },
                    message: "Post created!",
                    flashStatus: "success",
                    flashMessage: "Post published!"
                })
            }
            console.log("Nrmal request");
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
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted'
                });
            }
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