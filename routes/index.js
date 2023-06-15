var express = require('express');
var router = express.Router();
var controller = require('../controllers/main')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:code', controller.get_subjects);

module.exports = router;
