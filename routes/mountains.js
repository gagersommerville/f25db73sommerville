var express = require('express');
var router = express.Router();
const mountain_controller = require('../controllers/mountain');
router.get('/', mountain_controller.mountain_view_all_Page);

//Get detail page
router.get('/detail', mountain_controller.mountain_view_one_Page);

module.exports = router;
