const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Tell passport to use new google strategy for Google
passport.use(new googleStrategy({
    clientID: "269033975223-04irbig8s66ikjn9f4ln6mcm52hmup7b.apps.googleusercontent.com",
    clientSecret: "w4xQ8gHLDiXbP5SoFjvSwueE",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},

    function (accessToken, refreshToken, profile, done) {

        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log("**** Error in google-strategy-passport ", err); return;
            }

            console.log(profile);
            if (user) {
                //if found set this user as req.user
                return done(null, user);
            }
            else {
                // if not founcd create an user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log("**** Error in  creating user by google-strategy-passport ", err); return;
                    }
                    else {
                        return done(null, user);
                    }

                })
            }

        })
    }
))

module.exports = passport;