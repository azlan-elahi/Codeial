const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/post_controller');

router.post('/create', passport.checkAuthentication, postController.create);
//We used get but when we use AJAX then we use delete
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;