var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* add user. */
router.post('/', function(req, res, next) {
  console.log(req.body);

  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
  });

  res.send(req.body);
});

module.exports = router;
