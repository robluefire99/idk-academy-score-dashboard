const router = require('express').Router();
const passport = require('passport');
const subjCtrl = require('../controllers/subjectController');

router.get('/', passport.authenticate('jwt', { session: false }), subjCtrl.getSubjects);

module.exports = router;
