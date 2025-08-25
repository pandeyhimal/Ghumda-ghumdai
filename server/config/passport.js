import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import User from "../models/User.js";

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await User.create({
      fullName: profile.displayName,
      email: profile.emails[0].value,
      password: "N/A", // not used for social login
      role: "user"
    });
  }
  return done(null, user);
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await User.create({
      fullName: profile.displayName || profile.username,
      email: profile.emails[0].value,
      password: "N/A",
      role: "user"
    });
  }
  return done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5000/api/auth/facebook/callback",
  profileFields: ["id", "emails", "name", "displayName"]
}, async (accessToken, refreshToken, profile, done) => {
  let email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      fullName: profile.displayName,
      email,
      password: "N/A",
      role: "user"
    });
  }
  return done(null, user);
}));
export default passport;
