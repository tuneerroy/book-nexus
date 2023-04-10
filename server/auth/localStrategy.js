const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LocalStrategy = require('passport-local').Strategy
const User = require('./user-model')

passport.use(
    new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value
            const user = await User.getOrCreate({email})
            done(null, user)
          } catch (err) {
            done(err)
          }
        },
    ),
)

passport.use(
    new FacebookStrategy(
        {
          clientID: FACEBOOK_APP_ID,
          clientSecret: FACEBOOK_APP_SECRET,
          callbackURL: '/auth/facebook/callback',
          profileFields: ['email'],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value
            const user = await User.getOrCreate({email})
            done(null, user)
          } catch (err) {
            done(err)
          }
        },
    ),
)

passport.use(
    new LocalStrategy(
        {
          usernameField: 'email',
        },
        async (email, password, done) => {
          try {
            const user = await User.authenticate(email, password)
            done(null, user)
          } catch (err) {
            done(err)
          }
        },
    ),
)

// Serialize user object
passport.serializeUser((user, done) => {
  done(null, user.email)
})

// Deserialize user object
passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({email})
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

// Routes for Google and Facebook authentication
app.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}),
)

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/')
    },
)

app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {scope: ['email']}),
)

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/')
    },
)

// Route for local authentication
app.post(
    '/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/')
    },
)
