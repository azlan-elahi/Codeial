const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.home = function (req, res) {
    // return res.end("<h1>Codeial Home </h1>");
    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "CodEial | Home",
    //         posts: posts
    //     })
    // });
    //populate the user of each post

    //     Post.find({})
    //         .populate('user')
    //         .populate({
    //             path: 'comments', //for nested population we used path
    //             populate: {
    //                 path: 'user'
    //             }
    //         })
    //         .exec(function (err, posts) {


    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            console.log("Try populate");
            console.log(posts);
            return res.render('home', {
                title: "CodEial | Home",
                posts: posts
            })
        });
};
