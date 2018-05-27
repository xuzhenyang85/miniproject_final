var express = require('express');
var router = express.Router();

/* GET home page. */
// index er view template with object
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Project',
                        msg: 'Demo Project used in for Fullstack JavaScript' });
});

module.exports = router;
