const User = require('../models/user');
const cookieParser = require('cookie-parser');
// const { user } = require('../config/mongoose');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (err) {
                console.log("Error while getting to profile action");
            }
            if (user) {
                return res.render('user_profile', {
                    title: "profile",
                    user: user
                });
            }
        })
    }
    else {
        return res.redirect('/users/sign-in');
    }
}


//Sign Out
module.exports.signOut = function (req, res) {
    res.clearCookie("user_id");
    return res.redirect('/users/sign-in');
}


//Sign Up
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

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

//create session action
module.exports.createSession = function (req, res) {
    console.log("Session action");
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("Error in finding user for sign in");
        }
        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            console.log("ID mil gyi!!!")
            return res.redirect('/users/profile');
        }
        else {
            return res.redirect('back');
        };
    });
}