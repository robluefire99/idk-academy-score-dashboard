const router = require('express').Router();
const subjCtrl = require('../controllers/subjectController');

// Public access for subject list
router.get('/', subjCtrl.getSubjects);

module.exports = router;
