const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
//serializeuser to convert the id & pass into user id
passport.serializeUser((user, done) => {
    done(null, user.id);
}
);
//deserializuser to convert the user id into mongoose model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

//use passport to implement Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId:profile.id})
        .then((existingUser) => {
            if(existingUser){
                //we already have a record with the given profile ID
                done(null, existingUser);
            } else {
                //we dont have a user record with this ID, make a new record
                new User({ googleId: profile.id})
                .save()
                .then(user => done(null, user));
            }
        }); 
}
)
);