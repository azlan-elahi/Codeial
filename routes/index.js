const express = require('express');

const router = express.Router();


// const controllerName = reuqire('../path');
const homeController = require('../controllers/home_controller');


//router.get('/',actionController.actionName);
router.get('/', homeController.home);

module.exports = router;