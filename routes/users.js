const express = require('express');
const router = express.Router();
const passport = require('passport');
const { route } = require('.');


const userController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.get('/profile/', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
// router.post('/sign-out', userController.signOut);
//use passport as middleware to auth => if auth id done then it goes to third paramter create-session else they're going to failure url
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), userController.createSession);


router.get('/sign-out', userController.destroySession);

module.exports = router;