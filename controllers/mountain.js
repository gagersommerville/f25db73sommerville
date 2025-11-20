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


exports.mountain_detail = async function(req, res) {
  console.log("detail " + req.params.id);
  try {
    let result = await Mountain.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(500);
      res.send(`{"error": document for id ${req.params.id} not found"}`);
    }
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found"}`);
  }
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

exports.mountain_delete = async function(req, res) {
  console.log("delete " + req.params.id);
  try {
    let result = await Mountain.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "Error deleting ${err}"}`);
  }
};

exports.mountain_update_put = async function(req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

  try {
    let toUpdate = await Mountain.findById(req.params.id);

    if (!toUpdate) {
      res.status(500);
      res.send(`{"error": document for id ${req.params.id} not found"}`);
      return;
    }

    if (req.body.name)   toUpdate.name   = req.body.name;
    if (req.body.height) toUpdate.height = req.body.height;
    if (req.body.range)  toUpdate.range  = req.body.range;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id} failed"}`);
  }
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

exports.mountain_view_one_Page = async function(req, res) {
  console.log("single view for id " + req.query.id);
  try {
    let result = await Mountain.findById(req.query.id);
    res.render('mountaindetail', {
      title: 'Mountain Detail',
      toShow: result
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

exports.mountain_create_Page = function(req, res) {
  console.log("create view");
  try {
    res.render('mountaincreate', { title: 'Mountain Create' });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

exports.mountain_update_Page = async function(req, res) {
  console.log("update view for item " + req.query.id);
  try {
    let result = await Mountain.findById(req.query.id);
    res.render('mountainupdate', {
      title: 'Mountain Update',
      toShow: result
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

exports.mountain_delete_Page = async function(req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    let result = await Mountain.findById(req.query.id);
    res.render('mountaindelete', { 
      title: 'Mountain Delete', 
      toShow: result 
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};