const passport = require('passport');
// Reqiire local-passport property strategy
const LocalStrategy = require('passport-local').Strategy; //PASSPORT SUGGEST TO WRITE LocalStrategy first letter CAPITAL NAME
const User = require('../models/user');

//authentication using passport => create auth function
passport.use(new LocalStrategy({
    usernameField: 'email',   //make sure email is present in schema and unique
    passReqToCallback: true
},
    function (req, email, password, done) {   //call back function
        //Find a user and establish the identity
        console.log("email");
        User.findOne({ email: email }, function (err, user) { //first email is our db email and second email we passed as func argumnet
            if (err) {
                console.log("error in finding user --> Passport");
                req.flash('error', err);
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Invalid UserName/Password");
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

//Serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);  //Here we used user.id store in cookies but in encrypted manner
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error in finding user");
            return done(err);
        }
        return done(null, user);
    });
});

//check user is authenticate
passport.checkAuthentication = function (req, res, next) { //function using as middleware
    //if user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    //if user not signed in
    return res.redirect('/users/sign-in');
}

//
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //whenever user is signed in the user info is available in req.user but not send to res locals
        //req.user contains current signed in  userfrom the session cookie & we just sending this to the local to the viewa
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport; //we just exporting passport not strategy
