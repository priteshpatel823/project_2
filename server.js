require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session'); // cookie session 
require('./config/passport.js');
// var mysql = require("mysql");
const PORT = process.env.PORT || 8080;
const db = require('./models');
console.log('**********************');
// console.log(db);

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

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "comments_db"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// app.get("/", function(req, res) {
//   connection.query("SELECT * FROM comments;", function(err, data) {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.render("./public/index.html", { comments: data });
//   });
// });

// app.post("/api/comment", function(req, res) {
//   connection.query("INSERT INTO comments (user, comment) VALUES (?, ?)", [req.body.user, req.body.comment], function(
//     err,
//     result
//   ) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//   });
// });

db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log(`Server listening on port ${8080}!`)
  })
})





