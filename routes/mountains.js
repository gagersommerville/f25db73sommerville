var express = require('express');
var router = express.Router();
const mountain_controller = require('../controllers/mountain');
router.get('/', mountain_controller.mountain_view_all_Page);

module.exports = router;
