const router = require('express').Router();
const passport = require('passport');
const authCtrl = require('../controllers/authController');

router.post('/register', authCtrl.register);
router.post('/login',    authCtrl.login);
router.get('/verify/:token', authCtrl.verifyEmail);
router.get('/me', passport.authenticate('jwt', { session: false }), authCtrl.getMe);
router.post('/complete-profile', passport.authenticate('jwt', { session: false }), authCtrl.completeProfile);
router.get('/google', (req, res, next) => {
  console.log('Google OAuth endpoint hit');
  next();
}, passport.authenticate('google', { 
  scope: ['profile','email'],
  prompt: 'select_account consent' 
}));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => res.redirect(`http://localhost:3000/oauth?token=${req.user.token}`)
);

module.exports = router;
