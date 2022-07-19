const passport = require('passport');

module.exports = app => {
//initial route Handler
app.get('/auth/google',
 passport.authenticate('google', {
    scope: ['profile','email']
})
);
//callback Route Handler
app.get('/auth/google/callback',
passport.authenticate('google'));
};