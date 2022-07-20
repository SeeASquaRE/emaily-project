const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
//intialize passport and set cookiesession for passport
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
//dynamic port binding setup here
const PORT = process.env.PORT || 5000;
app.listen(PORT);