// Requiring our custom middleware for checking if a user is logged in
const isUserLoggedIn = require("../config/middleware/isUserLoggedIn");

module.exports = function(app) {
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", isUserLoggedIn, (req, res) => {

    // Send back the user's profile
    res.json({
      name: req.user.displayName,
      email: req.user.emails[0].value,
      picture: req.user.picture
    });
  });
};
