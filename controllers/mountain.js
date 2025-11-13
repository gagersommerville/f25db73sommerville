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

exports.mountain_create_post = async function(req, res) {
  console.log('POST /resource/mountains body:', req.body);

  let document = new Mountain();
  document.name = req.body.name;
  document.height = req.body.height;
  document.range = req.body.range;

  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
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