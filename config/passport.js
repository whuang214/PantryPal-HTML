const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(accessToken, refreshToken, profile, cb) {

    try {
      
      // find a user in the database based on their google id
      let user = await User.findOne({ googleId: profile.id });

      // if the user is found in the database, then log them in
      if (user) return cb(null, user);

      // else create a new user in our database using values from their google profile
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      return cb(null, user);
    } catch(err) {
      return cb(err);
    }

  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// 
passport.deserializeUser(async function(id, done) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

  const user = await User.findById(id);
  return done(null, user);
});



