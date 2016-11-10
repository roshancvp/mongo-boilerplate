var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/:id', function(req, res, next) {
  res.render('test', {id: req.params.id});
});

router.post('/test/submit', function(req, res, next) {
  var id = req.body.id;
  res.redirect('/test/' + id);
});

module.exports = router;
