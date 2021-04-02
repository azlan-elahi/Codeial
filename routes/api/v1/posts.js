const express = require('express');

const router = express.Router();
const passport = require('passport');

const postsApi = require('../../../controllers/api/v1/post_api');
router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', { session: false }), postsApi.destroy); //To prevent the sesion cookie create we assign false to session
module.exports = router;