module.exports.index = function (req, res) {
    return res.json(200, {
        message: "List of Posts from V2",
        posts: []
    })
}