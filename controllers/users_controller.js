const User = require('../models/user');
const Post = require('../models/post');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
// const { user } = require('../config/mongoose');

module.exports.profile = async function (req, res) {
    // return res.end('<h1>User Profile</h1>);
    // res.cookie('user', "Azlan");
    // console.log(req.cookie);
    try {
        let user = await User.findById(req.params.id);
        // console.log(user.avatar);
        return res.render('profile', {
            title: "profile",
            profile_user: user
        });

    } catch (err) {
        console.log("Error while fetching user profile ", err);
    }
};
module.exports.profileFriends = async function (req, res) {
    // return res.end('<h1>User Profile</h1>);
    // res.cookie('user', "Azlan");
    // console.log(req.cookie);
    try {
        let user = await User.findById(req.params.id);
        return res.render('profile-friend', {
            title: "profile",
            profile_user: user
        });

    } catch (err) {
        console.log("Error while fetching user profile ", err);
    }
};

module.exports.update = async function (req, res) {

    // if (req.user.id == req.params.id) { //It check with localuser or user who sent req with params id
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         req.flash('success', 'Successfully Update!');
    //         return res.redirect('/');
    //     })
    // } else {
    //     req.flash('error', 'Can not update name!');
    //     return res.status(401).sent('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('********Multer Error', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    if (user.avatar) { fs.unlinkSync(path.join(__dirname, '..', user.avatar)); }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Successfully Update!');
                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', err);
            return res.redirect('back')
        }
    }
    else {
        req.flash('error', 'Can not update name!');
        return res.status(401).sent('Unauthorized');
    }
}

//Sign Up
module.exports.signUp = function (req, res) {
    console.log("sign up action");
    // if (req.isAuthenticated) {
    //     return res.redirect('/users/profile');
    // }
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

        req.flash('error', 'Pssword not matched');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {

            req.flash('error', 'Error!!');
            console.log("Error in finding user in signing-up!!");
            if (!user) {
                User.create(req.body, function (err, user) {
                    if (err) {
                        req.flash('error', 'Error!!');
                        console.log("Error in creating user while Signing Up!!");
                        return;
                    }
                })

                req.flash('success', 'User Created');
                return res.redirect('/users/sign-in');
            }
        }
        else {
            console.log("User already present in DB");
            return res.redirect('back');
        }
    });
};

//Sign In
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

//Sign Out
// module.exports.signOut = function (req, res) {
//     return res.redirect('/users/sign-in');
// }

//sign out
module.exports.destroySession = function (req, res) {
    req.logout(); //passport give this function
    req.flash('error', 'You have logged out!');
    return res.redirect('/');
}

//Create session
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully');
    console.log("aagye create-session");
    return res.redirect('/users/profile'); //when Passport.js uses localStrategy for auth, session is created in passport.js itself
}

