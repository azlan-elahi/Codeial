const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),//not body of the function is passed ,call of the function is passed
    secretOrKey: 'codeial'
};

passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) { console.log('Error in finding user from JWT '); return; }
        if (user) { return done(null, user); }
        else { return done(err, false); }
    })
}));

module.exports = passport;
