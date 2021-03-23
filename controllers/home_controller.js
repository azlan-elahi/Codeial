const Post = require('../models/post');

module.exports.home = function (req, res) {
    // return res.end("<h1>Codeial Home </h1>");
    // Post.find({}, function (err, posts) {
    //     return res.render('home', {
    //         title: "CodEial | Home",
    //         posts: posts
    //     })
    // });
    //populate the user of each post

    Post.find({}).populate('user').exec(function (err, posts) {
        return res.render('home', {
            title: "CodEial | Home",
            posts: posts
        })
    });
}