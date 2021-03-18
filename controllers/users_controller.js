const User = require('../models/user');
const cookieParser = require('cookie-parser');
// const { user } = require('../config/mongoose');

module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile</h1>);
    res.cookie('user', "Azlan");
    console.log(req.cookie);
    return res.render('profile', {
        title: "profile"
    });
};

//Sign Up
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

//Sign In
// module.exports.signIn = function (req, res) {
//     return res.render('user_sign_in', {
//         title= "Codial | Sign In"
//     });
// };

//Create User
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        console.log("passowrd not match with confirm Password");
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("Error in finding user in signing-up!!");
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("Error in creating user while Signing Up!!");
                    return;
                }
                console.log("User created");
                return res.redirect('/users/sign-in');
            });
        }
        else {
            console.log("User already present in DB");
            return res.redirect('back');
        }
    });
};

//Sign In
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};