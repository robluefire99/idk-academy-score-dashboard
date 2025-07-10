const router = require('express').Router();
const passport = require('passport');
const roleM = require('../middlewares/roleMiddleware');
const scoreCtrl = require('../controllers/scoreController');

router.post('/', passport.authenticate('jwt', { session: false }), roleM('lecturer'), scoreCtrl.createScore);
router.get('/',  passport.authenticate('jwt', { session: false }), scoreCtrl.getScores);
router.put('/:id', passport.authenticate('jwt', { session: false }), roleM('lecturer'), scoreCtrl.updateScore);
router.delete('/:id', passport.authenticate('jwt', { session: false }), roleM('lecturer'), scoreCtrl.deleteScore);

module.exports = router;
