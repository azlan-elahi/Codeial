module.exports.home = function (req, res) {
    // return res.end("<h1>Codeial Home </h1>");
    return res.render('home', {
        title: "Home"
    })
}