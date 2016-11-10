var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Insert Data
 */
router.post('/insert', function(req, res, next) {
  var ride = {
    origin: req.body.origin,
    destination: req.body.destination,
  }

  res.redirect('/');

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('rides').insertOne(ride, function(err, result) {
      assert.equal(err, null);
      console.log("Ride inserted successfully");
      db.close();
    });
  });
});

/**
 * Get Data
 */
router.get('/get-data', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    // gets all documents
    var cursor = db.collection('rides').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.render('index', {rides: resultArray})
    });

  });
});


// router.get('/test/:id', function(req, res, next) {
//   res.render('test', {id: req.params.id});
// });
//
// router.post('/test/submit', function(req, res, next) {
//   var id = req.body.id;
//   res.redirect('/test/' + id);
// });

module.exports = router;
