const router = require('express').Router();
const passport = require('passport');
const authCtrl = require('../controllers/authController');

router.post('/register', authCtrl.register);
router.post('/login',    authCtrl.login);
router.get('/verify/:token', authCtrl.verifyEmail);
router.get('/me', passport.authenticate('jwt', { session: false }), authCtrl.getMe);
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => res.redirect(`/oauth?token=${req.user.token}`)
);

module.exports = router;
