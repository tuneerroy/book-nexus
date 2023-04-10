const express = require('express')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../userDb/User')

const router = express.Router()

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://book-nexus.herokuapp.com/api/auth/google/callback',
  profileFields: ['email'],
}, async (_accessToken, _refreshToken, profile, done) => {
  const user = await User.getOrCreate({email: profile.emails[0].value})
  done(null, user)
}))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'https://book-nexus.herokuapp.com/api/auth/facebook/callback',
  profileFields: ['email'],
}, async (_accessToken, _refreshToken, profile, done) => {
  const user = await User.getOrCreate({email: profile.emails[0].value})
  done(null, user)
}))

passport.use(new LocalStrategy(async (email, password, done) => {
  const user = await User.findOne({email})
  if (!user) {
    return done(null, false, {message: 'Incorrect email.'})
  }
  if (!(await User.checkPassword(email, password))) {
    return done(null, false, {message: 'Incorrect password.'})
  }
  done(null, user)
}))

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
  const user = await User.findOne({email})
  done(null, user)
})

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login'}))

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}))
router.get('/facebook/callback', passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'}))

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}))

router.post('/register', async (req, res) => {
  const {username, password} = req.body
  const email = username
  if (!email || !password) {
    return res.status(400).json({error: 'Missing email or password'})
  }

  const userExists = await User.findOne({email})
  if (userExists) {
    return res.status(400).json({error: 'User already exists'})
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({error: 'Invalid email'})
  }

  await User.create({email, password})
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'})(req, res)
})

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.get('/check', (req, res) => {
     return res.json({
        authenticated: req.isAuthenticated(),
    })
})

module.exports = router
