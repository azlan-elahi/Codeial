const express = require('express');

const router = express.Router();

//const ControlleraNAme = require('../path);
//router.get('/',actionController.actionName);
const homeController = require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;


// const controllerName = reuqire('../path');

//router.get('/',actionController.actionName);