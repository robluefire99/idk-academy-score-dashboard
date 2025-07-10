const router = require('express').Router();
const passport = require('passport');
const roleM = require('../middlewares/roleMiddleware');
const userCtrl = require('../controllers/userController');

router.get('/', passport.authenticate('jwt', { session: false }), roleM('admin'), userCtrl.getUsers);
router.put('/:id/role', passport.authenticate('jwt', { session: false }), roleM('admin'), userCtrl.updateRole);

// Student: Pick or update subject
router.put('/me/subject', passport.authenticate('jwt', { session: false }), roleM('student'), userCtrl.pickSubject);
// Lecturer: Get students who picked this lecturer's subject(s)
router.get('/me/students', passport.authenticate('jwt', { session: false }), roleM('lecturer'), userCtrl.getMyStudents);

module.exports = router;
