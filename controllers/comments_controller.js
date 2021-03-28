const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            //comment add to respective post meand UPDATION in DB
            post.comments.push(comment);
            post.save(); //save tells the db this is final version to store in db because before save it's in RAM
            req.flash('success', 'Comment Added!!');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        console.log("error to find post ", err); return;
    }
}


module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        // .id means converting the obj id into string automatically by mongoose
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment Deleted!!');
            return res.redirect('back');
        }
        else {
            req.flash('error', "You can not delete this comment");
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        console.log("Error while getting delete comment ", err);
    }
};
