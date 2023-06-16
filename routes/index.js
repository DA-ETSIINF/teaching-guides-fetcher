var express = require('express');
var router = express.Router();
var controller = require('../controllers/main')
var specials = require('../controllers/specials')

/* GET home page. */
router.get('/', controller.index);

/*router.get('/titulaciones/09TT/4', specials.get_09TT);
router.get('/titulaciones/09BM/4', specials.get_09BM);
router.get('/titulaciones/09AQ/2', specials.get_09AQ);*/

router.get('/titulacion/:code', controller.get_subjects_by_degree);
router.get('/departamentos/:code', controller.get_subjects_by_department);
router.get('/titulaciones/:tit/:year', controller.get_subjects_by_degree_and_course);
router.get('/titulaciones/:tit', controller.get_years_by_degree);
router.get('/titulaciones/:tit/:year/optativas', controller.get_optativas);
router.get('/titulaciones/:tit/:year/:group', controller.get_subjects_by_group);


module.exports = router;
