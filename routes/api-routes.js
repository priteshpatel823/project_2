// Requiring our custom middleware for checking if a user is logged in
const isUserLoggedIn = require("../config/middleware/isUserLoggedIn");
const db = require('../models')
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

  app.get('/api/comments', isUserLoggedIn, (req, res) => {
    db.comment.findAll({}).then(data => {
      res.json(data);
    }).catch(function(err){
      res.status(401).json(err)
    })
  });

  // route for adding data 
  app.post('/api/comments', isUserLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(db.comment);
    db.comment.create({
      comment: req.body.comment,
      email: req.body.email,
      name: req.body.name,
      picture: req.body.picture
    }).then(function(){
      res.status(307)
    }).catch(function(err){
      res.status(401).json(err)
    })
  });


};