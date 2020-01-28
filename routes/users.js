var express = require('express');
var mongoHelper = require('../helper/mongoHelper');

var db = mongoHelper.getDb();

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.collection('users').find().toArray(function(err, results) {
    res.send(results);
  })
});

/* add user. */
router.post('/', function(req, res, next) {
  console.log(req.body);

  db.collection('users').insertOne(req.body, (err, result) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.send(result);
    console.log('saved to database: ' + result);
  });
});

module.exports = router;
