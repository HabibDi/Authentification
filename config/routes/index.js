var express = require('express');
var indexController = require('../../controller/indexController');
var router = express.Router();

router.route('/')
    .get(indexController.home);
router.route('/login')
    .get(indexController.login)
    .post(indexController.login);
router.route('/signup')
    .get(indexController.signup)
    .post(indexController.signup)
module.exports = router;