const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req, res) { //index it's used when you list down something
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        return res.json(200, {
            message: "List of Posts",
            posts: posts
        });
    } catch (err) {
        console.log("error ", err);
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'Post and associated comments deleted successfully'
            });
        } else {
            return res.json(401, {
                message: "You cannot delete this post"
            })
        }
    } catch (err) {
        console.log('********Error: ', err);
        return res.json(500, {
            message: "Internal server error"
        })
    }
};