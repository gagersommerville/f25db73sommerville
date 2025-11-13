var Mountain = require('../models/mountain');

exports.mountain_list = async function(req, res) {
  try {
    const mountains = await Mountain.find();
    res.send(mountains);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};


exports.mountain_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Mountain detail: ' + req.params.id);
};

exports.mountain_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Moutain create POST');
};

exports.mountain_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Mountain delete DELETE ' + req.params.id);
};

exports.mountain_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Mountain update PUT ' + req.params.id);
};

exports.mountain_view_all_Page = async function(req, res) {
  try {
    const theMountains = await Mountain.find();
    res.render('mountains', { 
      title: 'Gage Sommerville – Mountain List',
      results: theMountains 
    });
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};