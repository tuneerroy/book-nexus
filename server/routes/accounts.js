const express = require("express");
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../userDb/User");

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://book-nexus.herokuapp.com/api/auth/google/callback",
      profileFields: ["email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const user = await getOrCreateUser(profile.emails[0].value);
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        "https://book-nexus.herokuapp.com/api/auth/facebook/callback",
      profileFields: ["email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const user = await getOrCreateUser(profile.emails[0].value);
      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
    if (!(await User.checkPassword(email, password))) {
      return done(null, false, { message: "Incorrect password." });
    }
    done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const user = await User.findOne({ email });
  done(null, user);
});

router.get("/google", passport.authenticate("google", { scope: ["email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/books",
    failureRedirect: "/",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/books",
    failureRedirect: "/",
  })
);

const authenticateLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Logged in successfully." });
    });
  })(req, res, next);
};

router.post("/login", authenticateLogin);

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const email = username;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    if (userExists.password) {
      return res.status(400).json({ message: "Account already exists." });
    } else {
      userExists.password = password;
      await userExists.save();
    }
  } else {
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }
    await User.create({ email, password });
  }

  authenticateLogin(req, res);
});

router.get("/check", (req, res) => {
  return res.json({
    authenticated: req.isAuthenticated(),
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});

const getOrCreateUser = async (email) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }
  return user;
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = router;
