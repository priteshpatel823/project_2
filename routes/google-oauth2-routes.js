const passport = require("passport");

module.exports = function (app) {

  // passport.authenticate is middleware function which will execute here///its like middleware
  // google request is made then this authenticate function will execute just before the request is made
  // also taking third argument scope means what information we want to see.
  app.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })); // authentication function with scope(which we want to see)

  // executing middleware function
  app.get('/google/callback', passport.authenticate('google', {
      failureRedirect: '/failed'
    }),
    function (req, res) {
      // Successful authentication redirect back to homepage
      res.redirect('/');
    }
  );

};