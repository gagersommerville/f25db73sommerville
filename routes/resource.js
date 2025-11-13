var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var mountain_controller = require('../controllers/mountain');

router.get('/', api_controller.api);

router.post('/mountains', mountain_controller.mountain_create_post);

router.delete('/mountains/:id', mountain_controller.mountain_delete);

router.put('/mountains/:id', mountain_controller.mountain_update_put);

router.get('/mountains/:id', mountain_controller.mountain_detail);

router.get('/mountains', mountain_controller.mountain_list);

module.exports = router;