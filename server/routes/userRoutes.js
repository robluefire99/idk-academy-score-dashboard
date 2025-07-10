const router = require('express').Router();
const passport = require('passport');
const roleM = require('../middlewares/roleMiddleware');
const userCtrl = require('../controllers/userController');

router.get('/', passport.authenticate('jwt', { session: false }), roleM('admin'), userCtrl.getUsers);
router.put('/:id/role', passport.authenticate('jwt', { session: false }), roleM('admin'), userCtrl.updateRole);

module.exports = router;
