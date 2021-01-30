require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session'); // cookie session 
require('./config/passport.js');

// Sets up the Express app to handle JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie session middleware // from document 
app.use(cookieSession({
  name: 'check-seesion',
    keys: ['key1', 'key2']
}));

//  passport and passport sessions are intilized here and these are middlewere functions
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));

// Requiring our routes
require("./routes/google-oauth2-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(8080, () => console.log(`Server listening on port ${8080}!`))

