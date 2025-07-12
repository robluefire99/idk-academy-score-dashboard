const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    return done(null, user || false);
  } catch (e) {
    return done(e, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (_, __, profile, done) => {
  try {
    const { email, name } = profile._json;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: 'GOOGLE_OAUTH',
        isVerified: true,
        profileComplete: false // Mark as incomplete, no role/subject yet
      });
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
}));
