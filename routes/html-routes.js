// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isUserLoggedIn = require("../config/middleware/isUserLoggedIn");

module.exports = function (app) {
  // protected and unprotected routes
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get('/failed', (req, res) => res.send('You Failed to log in!'));

  app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  });
};