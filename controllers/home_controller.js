const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// module.exports.home = function (req, res) {
// return res.end("<h1>Codeial Home </h1>");
// Post.find({}, function (err, posts) {
//     return res.render('home', {
//         title: "CodEial | Home",
//         posts: posts
//     })
// });
//populate the user of each post

//without using Async function code
// Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function (err, posts) {
//         User.find({}, function (err, users) {
//             return res.render('home', {
//                 title: "CodEial | Home",
//                 posts: posts,
//                 all_users: users
//             })
//         })
//     });

//With Async Await code

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});
        return res.render('home', {
            title: "CodEial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log("Error ", err);
        return;

    }
};
